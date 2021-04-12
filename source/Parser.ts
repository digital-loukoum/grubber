import Rule, { MatchRule } from "./Rule"
import Fragment from "./Fragment"
import languages, { LanguageName } from "./languages/index"

export type FromTo = {
	from: string | RegExp
	to: string | RegExp
}

export default class Parser {
	private stopExpressionCache = new Map<Rule, RegExp>()
	private _rules: Rule[] = []
	private language?: LanguageName

	get rules(): Rule[] {
		if (this.language) return new languages[this.language]().rules
		return this._rules
	}

	constructor(public content: string, rules: LanguageName | Rule[]) {
		if (typeof rules == "string") this.language = rules
		else this._rules = rules
	}

	find(...expressions: Array<string | RegExp>): Fragment[] {
		const result: Fragment[] = []
		const rules: Rule[] = [
			...expressions.map(expression => ({ type: "match", expression } as Rule)),
			...this.rules,
		]
		this.parse(rules, fragment => result.push(fragment))
		return result
	}

	replace(...fromTos: FromTo[]): string {
		let result = ""
		let offset = 0
		const rules: Rule[] = [
			...fromTos.map(
				({ from, to }) =>
					({
						type: "match",
						expression: from,
						from: new RegExp(`^${typeof from == "string" ? from : from.source}$`),
						to,
					} as Rule)
			),
			...this.rules,
		]

		this.parse(rules, (fragment, rule) => {
			result += this.content.slice(offset, fragment.start)
			result += fragment.slice.replace(rule.from!, rule.to!)
			offset = fragment.end
		})
		result += this.content.slice(offset)
		return result
	}

	findDependencies() {
		if (!this.language) throw `[findDependencies] No language specified`
		const importExpression = languages[this.language].importExpression
		if (!importExpression)
			throw `[findDependencies] No importExpression for language ${this.language}`
		return this.find(importExpression)
	}

	replaceDependencies(to: string) {
		if (!this.language) throw `[findDependencies] No language specified`
		const importExpression = languages[this.language].importExpression
		if (!importExpression)
			throw `[findDependencies] No importExpression for language ${this.language}`
		return this.replace({ from: importExpression, to })
	}

	private parse(rules: Rule[], onMatch: (fragment: Fragment, rule: MatchRule) => any) {
		const nextMatch = this.getNextMatchExpression(rules)

		let match: RegExpExecArray | null
		while ((match = nextMatch.exec(this.content))) {
			const matchingRule = this.getMatchingRule(rules, match)
			if (matchingRule == null) continue

			const [rule, ruleMatch] = matchingRule
			const fragment = this.resolveFragment(rule, match, ruleMatch.slice(1))
			if (!fragment) {
				// the fragment has no end (good chances it is a syntax error)
				console.warn("No stop found for rule", rule)
				break
			}
			// console.log("fragment:", fragment.slice)

			nextMatch.lastIndex = fragment.end
			if (rule.type == "match") onMatch(fragment, rule)
		}
	}

	private getRuleExpression(rule: Rule): string {
		const expression = "expression" in rule ? rule.expression : rule.startAt
		return typeof expression == "string" ? expression : expression.source
	}

	private getRuleStopExpression(rule: Rule): RegExp {
		let expression = this.stopExpressionCache.get(rule)
		if (expression) return expression
		if ("expression" in rule) throw `A standalone expression has no stop delimiter`
		expression = new RegExp(
			typeof rule.stopAt == "string" ? rule.stopAt : rule.stopAt.source,
			"gm"
		)
		this.stopExpressionCache.set(rule, expression)
		return expression
	}

	private getNextMatchExpression(rules: Rule[]): RegExp {
		return new RegExp(
			rules.map(rule => "(?:" + this.getRuleExpression(rule) + ")").join("|"),
			"gm"
		)
	}

	private getMatchingRule(
		rules: Rule[],
		match: RegExpExecArray
	): [Rule, RegExpMatchArray] | null {
		const [input] = match
		let noMatch = true
		// console.log(`Get matching rule of: '${input}'`)
		for (const rule of rules) {
			const ruleExpression = this.getRuleExpression(rule)
			const ruleMatch = input.match(ruleExpression)
			if (ruleMatch && ruleMatch.index == 0 && ruleMatch[0].length == input.length) {
				noMatch = false
				if ("expression" in rule) {
					if (
						"onExpressionMatch" in rule &&
						rule.onExpressionMatch &&
						rule.onExpressionMatch(ruleMatch) === false
					)
						continue
				} else {
					if (rule.onStartMatch && rule.onStartMatch(ruleMatch) === false) continue
				}
				return [rule, ruleMatch]
			}
		}
		if (noMatch) {
			console.log("[getMatchingRule] No rules matched with match:", match)
			throw `[getMatchingRule] No rules matched`
		}
		return null
	}

	private resolveFragment(
		rule: Rule,
		match: RegExpMatchArray,
		groups: string[] = []
	): Fragment | null {
		const start = match.index as number
		const input = match[0]
		const offset = start + input.length

		if ("expression" in rule) return new Fragment(this.content, start, offset, groups)
		else {
			const nextStop = this.getRuleStopExpression(rule)
			nextStop.lastIndex = offset
			let stop: null | RegExpExecArray
			while ((stop = nextStop.exec(this.content))) {
				if (!rule.onStopMatch || rule.onStopMatch(stop) !== false) {
					return new Fragment(this.content, start, stop.index + stop[0].length, groups)
				}
			}
			return null
		}
	}
}

import Rule from "./Rule"
import Fragment from "./Fragment"

export default class Parser {
	private stopExpressionCache = new Map<Rule, RegExp>()

	constructor(public content: string, public rules: Rule[]) {}

	find(expressions: string | RegExp | Array<string | RegExp>) {
		const result: Fragment[] = []
		if (!(expressions instanceof Array)) expressions = [expressions]
		const rules: Rule[] = [
			...expressions.map(expression => ({ type: "match", expression } as Rule)),
			...this.rules,
		]
		const nextMatch = this.getNextMatchExpression(rules)

		let match: RegExpExecArray | null
		while ((match = nextMatch.exec(this.content))) {
			const [rule, ruleMatch] = this.getMatchingRule(rules, match)
			const fragment = this.resolveFragment(rule, match)
			if (!fragment) {
				// the fragment has no end (good chances it is a syntax error)
				console.warn("No stop found for rule", rule)
				break
			}
			console.log("fragment:", fragment.slice)
			nextMatch.lastIndex = fragment.end
			if (rule.type == "match") result.push(fragment)
		}
		console.log("RESULT:", result)
		return result
	}

	findAll() {}

	replace() {}

	replaceAll() {}

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
	): [Rule, RegExpMatchArray] {
		const [input] = match
		// console.log("Get matching rule of:", input)
		for (const rule of rules) {
			const ruleExpression = this.getRuleExpression(rule)
			const ruleMatch = input.match(ruleExpression)
			if (ruleMatch && ruleMatch.index == 0 && ruleMatch[0].length == input.length) {
				// console.log("Matching rule:", rule, ruleMatch)
				if ("expression" in rule) {
					if (rule.onExpressionMatch && !rule.onExpressionMatch(ruleMatch)) continue
				} else {
					if (rule.onStartMatch && !rule.onStartMatch(ruleMatch)) continue
				}
				return [rule, ruleMatch]
			}
		}
		throw `[getMatchingRule] No rule matched`
	}

	private resolveFragment(rule: Rule, match: RegExpMatchArray): Fragment | null {
		const start = match.index as number
		const input = match[0]
		const offset = start + input.length

		if ("expression" in rule) return new Fragment(this.content, start, offset)
		else {
			const nextStop = this.getRuleStopExpression(rule)
			nextStop.lastIndex = offset
			let stop: null | RegExpExecArray
			while ((stop = nextStop.exec(this.content))) {
				if (!rule.onStopMatch || rule.onStopMatch(stop)) {
					return new Fragment(this.content, start, stop.index + stop[0].length)
				}
			}
			return null
		}
	}
}

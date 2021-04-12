import Language from "../Language"
import Rule from "../Rule"

export default class implements Language {
	private backtickScope: number[] = []

	private get backtickLevel() {
		return this.backtickScope.length
	}
	private get currentScope() {
		return this.backtickScope[this.backtickScope.length - 1]
	}
	private set currentScope(value: number) {
		this.backtickScope[this.backtickScope.length - 1] = value
	}

	static readonly importExpression = /import(?:\s+(.*?)\s+from)?\s+('|")(.+?)\2/g

	readonly rules: Rule[] = [
		{
			// single quote string
			expression: /'.*?[^\\](?:\\\\)*'/,
		},
		{
			// double quote string
			expression: /".*?[^\\](?:\\\\)*"/,
		},
		{
			// backtick string
			startAt: /`|{|}/,
			onStartMatch: match => {
				if (match[0] == "{") {
					if (this.backtickLevel) this.currentScope++
					return false
				} else if (match[0] == "}") {
					if (this.backtickLevel) {
						if (this.currentScope == 0) {
							this.backtickScope.pop()
							return true
						}
						this.currentScope--
					}
					return false
				}
				return true
			},

			stopAt: /[^\\](?:\\\\)*(\${|`)/,
			onStopMatch: match => {
				if (match[1] == "${") this.backtickScope.push(0)
				return true
			},
		},
		{
			// single line comment
			expression: /\/\/.*/,
		},
		{
			// multiline comment
			expression: /\/\*((?:.|\s)*?)\*\//,
		},
	]
}

import Language from "../Language"

class Scope {
	brackets = 0 // brackets depth
}

export default class Javascript implements Language {
	scopes: Scope[] = [new Scope()]

	get scope() {
		return this.scopes[this.scopes.length - 1]
	}
	get brackets() {
		return this.scope.brackets
	}
	set brackets(value: number) {
		this.scope.brackets = value
	}

	readonly rules = [
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
			stopAt: /[^\\](?:\\\\)*(\${|`)/,
			onStartMatch: () => {},
			onStopMatch: () => {},
		},
		{
			// single line comment
			expression: /\/\/.*?$/,
		},
		{
			// multiline comment
			expression: /\/\*.*?\*\//,
		},
	]
}

import Language from "../Language.js"
import Rule from "../Rule.js"

export default class implements Language {
	static readonly importExpression = /#include\s*"(.+?)"/g

	readonly rules: Rule[] = [
		{
			// string
			expression: /".*?[^\\](?:\\\\)*"/,
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

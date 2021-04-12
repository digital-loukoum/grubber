import Language from "../Language"
import Rule from "../Rule"

export default class implements Language {
	static readonly importExpression = /#include\s*((?:".+?")|(?:<.+?>))/g

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

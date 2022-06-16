import Language from "../Language.js"
import Rule from "../Rule.js"

export default class implements Language {
	static readonly importExpression =
		/^(?:(?:\bfrom +(.*?) +)?(\bimport) +(.*?)) *(?:\bas +(.*?))? *$/gm

	readonly rules: Rule[] = [
		{
			// multi line string
			expression: /"""((?:.|\s)*?)[^\\](?:\\\\)*"""/,
		},
		{
			// single quote string
			expression: /'.*?[^\\](?:\\\\)*'/,
		},
		{
			// double quote string
			expression: /".*?[^\\](?:\\\\)*"/,
		},
		{
			// comment
			expression: /#.*/,
		},
	]
}

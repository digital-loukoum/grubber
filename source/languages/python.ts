import Language from "../Language"
import Rule from "../Rule"

export default class implements Language {
	static readonly importExpression = /^(?:(?:from +(.*?) +)?(import) +(.*?)) *(?:\bas +(.*?))? *$/gm

	readonly rules: Rule[] = [
		{
			// multi line string
			expression: /""".*?[^\\](?:\\\\)*"""/,
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
			expression: /#.*?$/,
		},
	]
}

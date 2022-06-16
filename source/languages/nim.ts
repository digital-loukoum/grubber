import Language from "../Language.js"
import Rule from "../Rule.js"

export default class implements Language {
	static readonly importExpression =
		/^(?:(?:(\bfrom +(.*?) +)?(\bimport) +(.*?))|(?:(\binclude) +(.*?))) *$/gm

	readonly rules: Rule[] = [
		{
			// string
			expression: /".*?[^\\](?:\\\\)*"/,
		},
		{
			// multiline comment
			expression: /#\[((?:.|\s)*?)\]#/,
		},
		{
			// comment
			expression: /#.*/,
		},
	]
}

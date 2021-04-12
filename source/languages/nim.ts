import Language from "../Language"
import Rule from "../Rule"

export default class implements Language {
	static readonly importExpression = /^(?:(?:(from +(.*?) +)?(import) +(.*?))|(?:(include) +(.*?))) *$/gm

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

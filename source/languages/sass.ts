import Language from "../Language"
import Rule from "../Rule"

export default class implements Language {
	static readonly importExpression = /@(import|use)[ \t]+([^ \t]+?)[ \t]*(?:\n|$|;)/gm

	readonly rules: Rule[] = [
		{
			// string
			expression: /".*?[^\\](?:\\\\)*"/,
		},
		{
			// string
			expression: /'.*?[^\\](?:\\\\)*'/,
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

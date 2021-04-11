import Language from "../Language"
import Rule from "../Rule"

export default class implements Language {
	static readonly importExpression = /@(import|use)\s*("|')(.+?)\1/g

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
			expression: /\/\/.*?$/,
		},
		{
			// multiline comment
			expression: /\/\*.*?\*\//,
		},
	]
}

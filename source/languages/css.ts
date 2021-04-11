import Language from "../Language"
import Rule from "../Rule"

export default class implements Language {
	static readonly importExpression = /@import\s+("|')(.+?)\1/g

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
			// comment
			expression: /\/\*.*?\*\//,
		},
	]
}

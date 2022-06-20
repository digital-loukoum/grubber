import Language from "../Language.js";
import Rule from "../Rule.js";

export default class implements Language {
	static readonly importExpression = /@(import|use)\s*("|')(.+?)\2/g;

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
	];
}

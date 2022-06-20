import Language from "../Language.js";
import Rule from "../Rule.js";

export default class implements Language {
	static readonly importExpression = /@import\s+("|')(.+?)\1/g;

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
			expression: /\/\*((?:.|\s)*?)\*\//,
		},
	];
}

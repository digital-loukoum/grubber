import Language from "../Language.js";
import Rule from "../Rule.js";

export default class implements Language {
	static readonly importExpression = /@(import|use)[ \t]+([^ \t]+?)[ \t]*(?:\n|$|;)/gm;

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

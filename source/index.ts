import Rule from "./Rule.js";
import Parser from "./Parser.js";
import Fragment from "./Fragment.js";
import { LanguageName } from "./languages/index.js";

/**
 * @return a Parser instance with which the user can execute find and replace operations
 */
export function grub(content: string, rules: Rule[] | LanguageName = "es") {
	return new Parser(content, rules);
}

export { Rule, LanguageName, Fragment, Parser };

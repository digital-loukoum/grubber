import Rule from "./Rule"
import Parser from "./Parser"
import { LanguageName } from "./languages/index"

/**
 * @return a Parser instance with which the user can execute find and replace operations
 */
export function grub(content: string, rules: Rule[] | LanguageName = "es") {
	return new Parser(content, rules)
}

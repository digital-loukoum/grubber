import Rule from "./Rule"
import Parser from "./Parser"
import languages from "./languages"

type Language = keyof typeof languages

/**
 * @return a Parser instance with which the user can execute find and replace operations
 */
export function grub(content: string, rules: Rule[] | Language = "javascript") {
	return new Parser(
		content,
		typeof rules == "string" ? new languages[rules]().rules : rules
	)
}

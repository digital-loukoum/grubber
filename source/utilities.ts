import Parser from "./Parser"
import { createRequire } from "module"

const { resolve } = createRequire(import.meta.url)

/**
 * When Typescript compiles dependencies, it adds no '.js' extension at the end of imports.
 * The problem is: browser, Node and Deno all need this '.js' extension.
 * (Thanks #TypescriptTeam for not being standard, look at all the additional work you make me do!)
 * (All this work for three letters!!...)
 * (Love your work though, Typescript is an awesome language.)
 * This utility function can be used after a Typescript compilation to add the mandatory '.js'
 */
export function addJsExtensionToImportStatements(content: string): string {
	const dependencies = new Parser(content, "es").findDependencies()
	let result = ""
	let offset = 0
	for (const dependency of dependencies) {
		const imported = dependency.groups[2].trim()
		if (imported[0] == "." || imported[0] == "/") {
			// relative import ; we add .js
			result += content.slice(offset, dependency.start)
			result += offset = dependency.end
		}
	}
	return result
}

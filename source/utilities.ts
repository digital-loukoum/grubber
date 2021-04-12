import Parser from "./Parser"
import { relative } from "path"
// import { createRequire } from "module"

/**
 * When Typescript compiles dependencies, it adds no '.js' extension at the end of imports.
 * The problem is: browser, Node and Deno all need this '.js' extension.
 * (Thanks #TypescriptTeam for not being standard, look at all the additional work you make me do!)
 * (All this work for three letters!!...)
 * (Love your work though, Typescript is an awesome language.)
 * This utility function can be used after a Typescript compilation to add the mandatory '.js'
 */
export function addJsExtensionToImportStatements(
	content: string,
	directory: string
): string {
	const dependencies = new Parser(content, "es").findDependencies()
	console.log("dependencies:", dependencies)
	let result = ""
	let offset = 0

	for (const dependency of dependencies) {
		let imported = dependency.groups[2].trim()
		const path = require.resolve(imported, {
			paths: [directory],
		})
		console.log("path", path)

		if (path != imported) {
			const nodeModulesIndex = path.lastIndexOf("node_modules/")
			if (~nodeModulesIndex) imported = path.slice(nodeModulesIndex + 1)
			else {
				imported = relative(directory, path)
				if (imported[0] != "." && imported[0] != "/") imported = "./" + imported
			}

			result +=
				content.slice(offset, dependency.start) +
				"import " +
				dependency.groups[0] +
				" from " +
				dependency.groups[1] +
				imported +
				dependency.groups[1]
			offset = dependency.end
		}
	}

	result += content.slice(offset)
	console.log(result)
	return result
}

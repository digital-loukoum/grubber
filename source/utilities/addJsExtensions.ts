import Parser from "../Parser.js"
// import { createRequire } from "module"

/**
 * @param resolve callback that take a module endpoint as entry and the right .js file that is imported
 */
export default function addJsExtensions(
	content: string,
	resolve: (imported: string) => string
): string {
	const dependencies = new Parser(content, "es").findDependencies()
	let result = ""
	let offset = 0

	for (const dependency of dependencies) {
		let imported = dependency.groups[2].trim()
		const patchedImport = resolve(imported)
		if (patchedImport != imported) {
			result +=
				content.slice(offset, dependency.start) +
				(dependency.slice.startsWith("import") ? "import " : "export ") +
				dependency.groups[0] +
				" from " +
				dependency.groups[1] +
				patchedImport +
				dependency.groups[1]
			offset = dependency.end
		}
	}

	result += content.slice(offset)
	return result
}

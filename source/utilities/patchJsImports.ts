import { readdirSync, statSync, readFileSync, writeFileSync } from "fs"
import addJsExtensions from "./addJsExtensions"
import { relative, resolve as resolvePath } from "path"
import { createRequire } from "module"
import { AliasResolver, resolveAliases } from "./resolveAliases"

const require = createRequire(process.cwd())
const resolve = (dependency: string, directory: string) =>
	require.resolve(dependency, { paths: [directory] })

/**
 * When Typescript compiles dependencies, it adds no '.js' extension at the end of imports.
 * The problem is: browser, Node and Deno all need this '.js' extension.
 * (Thanks #TypescriptTeam for not being standard, look at all the additional work you make me do!)
 * (All this work for three stupid letters!...)
 * (Love your work though, Typescript is an awesome language <3)
 * This utility function can be used after a Typescript compilation to add the mandatory '.js'
 */
export default function patchJsImports(
	directories: string[],
	aliases?: Array<AliasResolver>
) {
	for (let directory of directories) {
		directory = resolvePath(directory)

		for (const element of readdirSync(directory)) {
			const entity = `${directory}/${element}`
			if (statSync(entity).isDirectory()) {
				patchJsImports([entity], aliases)
			} else {
				// only patch .js, .cjs and .mjs files
				if (!element.match(/\.[mc]?js$/)) continue

				const content = readFileSync(entity, "utf8")

				const patchedContent = addJsExtensions(content, imported => {
					let resolvedAlias = resolveAliases(imported, aliases)
					if (resolvedAlias != null) return resolvedAlias
					let path = resolve(imported, directory)

					if (path != imported) {
						const nodeModulesDirectory = "node_modules/"
						const nodeModulesIndex = path.lastIndexOf(nodeModulesDirectory)
						if (~nodeModulesIndex) path = imported
						else {
							path = relative(directory, path)
							if (path[0] != "." && path[0] != "/") path = "./" + path
						}
					}

					return path
				})

				writeFileSync(entity, patchedContent)
			}
		}
	}
}

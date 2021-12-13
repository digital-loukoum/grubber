import { grub } from "../library/index"
import { readFileSync, readdirSync } from "fs"
import { extname } from "path"
import start from "fartest"
import { LanguageName } from "../library/languages/index"

const occurences = (content: string, find: RegExp) => (content.match(find) || []).length

start("Grubber", ({ stage, same, test }) => {
	// read sample files
	const samplesDir = `test/samples`
	for (const sample of readdirSync(samplesDir)) {
		// if (sample != "sample.es") continue

		const language = extname(sample).slice(1) as LanguageName
		stage(language)
		const content = readFileSync(`${samplesDir}/${sample}`, "utf8")
		const fooCount = occurences(content, /foo/g)
		const dependencies = grub(content, language).findDependencies()
		// console.log("\n" + language.toUpperCase(), "\n", dependencies)

		same(dependencies.length, fooCount, `Bad number of dependencies`)
		for (const { slice, start, end } of dependencies) {
			test(slice.includes("foo"), `${slice} (${start}..${end})`)
		}
	}
})

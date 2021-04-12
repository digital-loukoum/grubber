import { grub } from "../source/index"
import { readFileSync, readdirSync } from "fs"
import { extname } from "path"
import start from "fartest"
import { LanguageName } from "../source/languages/index"

start("Grubber", ({ stage }) => {
	// read sample files
	const samplesDir = `test/samples`
	for (const sample of readdirSync(samplesDir)) {
		const language = extname(sample).slice(1) as LanguageName
		stage(`[SAMPLE:${language.toUpperCase()}]`)
		const content = readFileSync(`${samplesDir}/${sample}`, "utf8")
		const fooCount = (content.match(/is/g) || []).length
		const dependencies = grub(content, language).findDependencies()
		console.log("\n" + language.toUpperCase())
		console.log(dependencies)
	}
})

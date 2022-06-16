import { defineBuildConfig } from "unbuild"
import { rmSync } from "fs"

// rmSync("library", { recursive: true, force: true })

export default defineBuildConfig({
	entries: [
		{
			input: "source/",
			outDir: "library/",
			format: "esm",
			declaration: true,
			ext: "js"
		},
		// {
		// 	input: "source/",
		// 	outDir: "library/",
		// 	format: "cjs",
		// 	declaration: true,
		// },
	],
	clean: true,
})

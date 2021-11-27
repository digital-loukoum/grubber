import patchJsImports from "../../source/utilities/patchJsImports"
import ncpPackage from "ncp"
import { rmSync } from "fs"

const { ncp } = ncpPackage

rmSync("test/patchJsImports/sampleToPatch", { recursive: true, force: true })

ncp("test/patchJsImports/sample", "test/patchJsImports/sampleToPatch", error => {
	if (error) throw error
	patchJsImports(
		["test/patchJsImports/sampleToPatch"],
		[
			{
				find: /^this\//,
				replacement: null,
			},
		]
	)
})

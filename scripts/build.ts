import { rmSync } from "fs"
import { exec } from "child_process"
import patchJsImports from "../source/utilities/patchJsImports"

console.log("Cleaning library...")
rmSync("library", { recursive: true, force: true })

console.log("Compiling Typescript...")
exec("node_modules/.bin/tsc", error => {
	if (error) console.error(error)
	else {
		console.log("Patching imports...")
		patchJsImports(["library"])
		console.log("\nBuild done!")
	}
})

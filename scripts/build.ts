import { rmdirSync } from "fs"
import { exec } from "child_process"
import patchJsImports from "../source/utilities/patchJsImports"

console.log("Cleaning library...")
rmdirSync("library", { recursive: true })

console.log("Compiling Typescript...")
exec("tsc", error => {
	if (error) console.error(error)
	else {
		console.log("Patching imports...")
		patchJsImports("library")
		console.log("\nBuild done!")
	}
})

import { addJsExtensionToImportStatements } from "../source/utilities"
import { readdirSync, readFileSync } from "fs"
import { dirname } from "path"

const libraryDirectory = "library"
for (const file of readdirSync(libraryDirectory)) {
	if (!file.endsWith(".js")) continue
	const filePath = `${libraryDirectory}/${file}`
	const content = readFileSync(filePath, "utf8")
	console.log("filePath", filePath)
	addJsExtensionToImportStatements(content, libraryDirectory)
}

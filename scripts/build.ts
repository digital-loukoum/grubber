import { copyFileSync, rmSync } from "fs";
import { execSync } from "child_process";

console.log("Cleaning package...");
rmSync("package", { recursive: true, force: true });

console.log("Compiling Typescript...");

const tscPath =
	process.platform === "win32"
		? "node_modules\\.bin\\tsc"
		: "node_modules/.bin/tsc";

execSync(tscPath, { stdio: "inherit" });

console.log("Copying configuration files...");
copyFileSync("./README.md", "./package/README.md");
copyFileSync("./package.json", "./package/package.json");

console.log("✨ Build done");

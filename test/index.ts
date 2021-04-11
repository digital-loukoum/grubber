import { grub } from "../source/index"
import { readFileSync } from "fs"

const sample = readFileSync("test/sample.ts", "utf8")
grub(sample).replace({ from: "import (.*?) from", to: "import zototo from" })

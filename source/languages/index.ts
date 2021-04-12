import ecmascript from "./es"
import c from "./c"
import cpp from "./cpp"
import css from "./css"
import scss from "./scss"
import sass from "./sass"
import nim from "./nim"
import python from "./py"
import rust from "./rs"

const languages = {
	ecmascript,
	c,
	cpp,
	css,
	scss,
	sass,
	nim,
	python,
	rust,
}
export default languages
export type LanguageName = keyof typeof languages

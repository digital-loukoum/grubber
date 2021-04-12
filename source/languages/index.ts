import es from "./es"
import c from "./c"
import cpp from "./cpp"
import css from "./css"
import scss from "./scss"
import sass from "./sass"
import nim from "./nim"
import py from "./py"
import rs from "./rs"

const languages = {
	es,
	c,
	cpp,
	css,
	scss,
	sass,
	nim,
	py,
	rs,
}
export default languages
export type LanguageName = keyof typeof languages

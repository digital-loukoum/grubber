import ecmascript from "./ecmascript"

const languages = {
	ecmascript,
}
export default languages
export type LanguageName = keyof typeof languages

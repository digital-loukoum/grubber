export type MatchRule = {
	type: "match"
	expression: string | RegExp
	from?: RegExp
	to?: string
}

type Rule =
	| MatchRule
	| {
			type?: undefined
			expression: string | RegExp
			onExpressionMatch?: (match: RegExpMatchArray) => boolean | void
	  }
	| {
			type?: undefined
			startAt: string | RegExp
			stopAt: string | RegExp
			onStartMatch?: (match: RegExpMatchArray) => boolean | void
			onStopMatch?: (match: RegExpMatchArray) => boolean | void
	  }
export default Rule

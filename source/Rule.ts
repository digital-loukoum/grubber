type Rule = {
	type?: "match"
} & (
	| {
			expression: string | RegExp
			onExpressionMatch?: (match: RegExpMatchArray) => boolean | void
	  }
	| {
			startAt: string | RegExp
			stopAt: string | RegExp
			onStartMatch?: (match: RegExpMatchArray) => boolean | void
			onStopMatch?: (match: RegExpMatchArray) => boolean | void
	  }
)
export default Rule

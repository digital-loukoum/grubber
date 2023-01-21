import { Match } from "./Match.js";

export type MatchRule = {
	type: "match";
	expression: string | RegExp;
	from?: RegExp;
	to?: string;
};

type Rule =
	| MatchRule
	| {
			type?: undefined;
			expression: string | RegExp;
			onExpressionMatch?: (match: Match) => boolean | void;
	  }
	| {
			type?: undefined;
			startAt: string | RegExp;
			stopAt: string | RegExp;
			onStartMatch?: (match: Match) => boolean | void;
			onStopMatch?: (match: Match) => boolean | void;
	  };
export default Rule;

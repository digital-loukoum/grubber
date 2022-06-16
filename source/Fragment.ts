export default class Fragment {
	slice: string;

	constructor(
		source: string,
		public start: number,
		public end: number,
		public groups: string[] = []
	) {
		this.slice = source.slice(start, end);
	}

	get length() {
		return this.slice.length;
	}
}

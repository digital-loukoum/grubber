export default class Fragment {
	slice: string

	constructor(public source: string, public start: number, public end: number) {
		this.slice = source.slice(start, end)
	}

	get length() {
		return this.slice.length
	}
}

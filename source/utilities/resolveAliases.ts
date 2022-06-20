export type AliasResolver = {
	find: RegExp
	replacement: string | null
};

export function resolveAliases(
	path: string,
	aliases?: Array<AliasResolver>
): string | null {
	if (aliases) {
		for (const { find, replacement } of aliases) {
			if (find.test(path)) {
				if (replacement) return path.replace(find, replacement);
				else return path;
			}
		}
	}
	return null;
}

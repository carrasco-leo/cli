//
// format-byte-size.ts — @carrasco-leo/cli
// ~/src/utils
//

export function formatByteSize(size: number): string {
	if (size < 1024) {
		return `${size} bytes`;
	}

	if (size < 1024 * 1024) {
		return `${(size / 1024).toFixed(1)} kB`;
	}

	return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

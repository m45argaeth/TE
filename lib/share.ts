/** Encode/decode the playground text in the URL hash for shareable links. */
export function encodeShareText(text: string): string {
	try {
		return encodeURIComponent(btoa(unescape(encodeURIComponent(text))))
	} catch {
		return encodeURIComponent(text)
	}
}

export function decodeShareText(encoded: string): string {
	try {
		return decodeURIComponent(escape(atob(decodeURIComponent(encoded))))
	} catch {
		try {
			return decodeURIComponent(encoded)
		} catch {
			return ""
		}
	}
}

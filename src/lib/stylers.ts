export interface StyleObject {
	class: string;
}

function toCssClassName(str: string): string {
	let cssClass = str.replace(/[^a-z0-9]/gi, '-').toLowerCase();
	if (/^\d/.test(cssClass)) cssClass = `n-${cssClass}`;
	return cssClass;
}

export function cellStyle(value: string | boolean | null | undefined): string {
	if (!value) return 'none';
	if ( typeof value !== 'string' ) {
		value = value.toString()
	}
	return value.match(/^\W/) ? `irregular-${toCssClassName(value)}` : toCssClassName(value);
}

export function clearStyle(
	clearance: string | null | undefined
): string {
	const clear_class = (() => {
		if (!clearance) return 'Unknown';

		const clearanceLower = clearance.toLowerCase();
		if (clearanceLower.includes('level 1')) return 'unrestricted';
		if (clearanceLower.includes('level 2')) return 'restricted';
		if (clearanceLower.includes('level 3')) return 'confidential';
		if (clearanceLower.includes('level 4')) return 'secret';
		if (clearanceLower.includes('level 5')) return 'top-secret';
		if (clearanceLower.includes('level 6')) return 'cosmic-top-secret';
		
		return 'Unknown';
	})();

	return clear_class;
}
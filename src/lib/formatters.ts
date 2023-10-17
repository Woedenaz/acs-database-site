export function lowerFormatter(value: string | null | undefined): string {
	if (!value) return 'none';
	if (value.match(/^[#0-9]\//)) {
		value = value.split('/')[1];
	}
	return value.toLowerCase();
}

export function fragmentFormatter(value: boolean | null | undefined): string {
	return value ? 'yes' : 'no';
}

export function titleFormatter(value: string | null | undefined): string {
	if (!value) return 'none';
	if (value.match(/^[#0-9]\//)) {
		value = value.split('/')[1];
	}
	if (value.includes('scp-')) {
		value = value.replace('scp-', 'SCP-');
	}
	return value;
}

export function linkFormatter(
	url: string | null | undefined,
	name: string | null | undefined,
	number: string | null | undefined
): string {
	if (!url) return 'none';

	const text: string = !number ? (name ? name : 'Unknown Name') : number;

	if (number === 'SCP-000' || (!name && !number)) {
		return `<a href='${url}' target='_blank'>Unknown Name</a>`;
	}

	return `<a href='${url}' target='_blank'>${text}</a>`;
}

export function clearFormatter(clearance: string | null | undefined, clearance_text: string | null | undefined): string {
	return `${clearance}/ ${clearance_text}`;
}
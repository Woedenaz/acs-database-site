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

export function clearFormatter(
	clearance: string | null | undefined,
	clearance_text: string | null | undefined
): string {
	if (!clearance_text) {
		clearance_text = (() => {
			switch (clearance) {
				case 'LEVEL 1':
					return 'Unrestricted';
				case 'LEVEL 2':
					return 'Restricted';
				case 'LEVEL 3':
					return 'Confidential';
				case 'LEVEL 4':
					return 'Secret';
				case 'LEVEL 5':
					return 'Top Secret';
				case 'LEVEL 6':
					return 'Cosmic Top Secret';
				default:
					return clearance ?? 'Unknown';
			}
		})();
	}

	if (clearance == clearance_text) {
		return clearance_text ?? 'Unknown';
	}

	return `${clearance ?? 'Unknown'}/ ${clearance_text}`;
}

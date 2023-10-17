import type { PageLoad } from './$types';
import { lowerFormatter, fragmentFormatter, titleFormatter, clearFormatter } from '$lib'

const predefinedClearance = [
	'1/ Unrestricted',
	'2/ Restricted',
	'3/ Confidential',
	'4/ Secret',
	'5/ Top-Secret',
	'6/ Cosmic Top-Secret'
];

const predefinedContain = [
	'safe',
	'euclid',
	'keter',
	'neutralized',
	'pending',
	'explained',
	'esoteric'
];

const predefinedSecondary = [
	'thaumiel',
	'uncontained',
	'archon',
	'cernunnos',
	'decommissioned',
	'ticonderoga',
	'tiamat',
	'hiemal'
];

const predefinedDisrupt = [
	'dark',
	'vlam',
	'keneq',
	'ekhi',
	'amida'
];

const predefinedRisk = [
	'notice',
	'caution',
	'warning',
	'danger',
	'critical'
];

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('db/acs_database.json');
	const data = await res.json();

	const scps: Scp[] = data.map((scp: Scp) => ({
		clearance: scp.clearance,
		clearance_text: scp.clearance_text,
		contain: lowerFormatter(scp.contain),
		disrupt: lowerFormatter(scp.disrupt),
		fragment: fragmentFormatter(scp.fragment),  
		name: titleFormatter(scp.name),
		number: scp.number, 
		risk: lowerFormatter(scp.risk),
		secondary: lowerFormatter(scp.secondary),
		url: scp.url
	}))

	const clearanceValues: string[] = predefinedClearance.concat(
		Array.from(new Set(scps.map((scp: Scp) => scp.clearance)))
			.filter((value: string) => !predefinedClearance.includes(value))
			.sort()
	);

	const containValues = predefinedContain.concat(
		Array.from(new Set(scps.map((scp: Scp) => scp.contain)))
			.filter((value: string) => !predefinedContain.includes(value))
			.sort()
	);

	const secondaryValues = predefinedSecondary.concat(
		Array.from(new Set(scps.map((scp: Scp) => scp.secondary)))
			.filter((value: string) => !predefinedSecondary.includes(value))
			.sort()
	);

	const disruptValues = predefinedDisrupt.concat(
		Array.from(new Set(scps.map((scp: Scp) => scp.disrupt)))
			.filter((value: string) => !predefinedDisrupt.includes(value))
			.sort()
	);

	const riskValues = predefinedRisk.concat(
		Array.from(new Set(scps.map((scp: Scp) => scp.risk)))
			.filter((value: string) => !predefinedRisk.includes(value))
			.sort()
	);

	return { scps, clearanceValues, containValues, secondaryValues, disruptValues, riskValues };
};
<script lang="ts">
	import type { PageData } from './$types';
  import { DataHandler } from '@vincjo/datatables'
	import { cellStyle, clearStyle, linkFormatter } from '$lib'
	import { Datatable, Th, ThTextFilter, ThDropFilter } from '$lib/components'

	type Header = {
		label: string;
		orderBy: keyof Scp;
		filterBy: keyof Scp;
		values?: string[];
	}

	export let data: PageData;
  const { scps, clearanceValues, containValues, secondaryValues, disruptValues, riskValues } = data as PageData;
	const fragmentValues: string[] = ['yes', 'no'];

	let headers: Header[] = [
    { label: 'Item #', orderBy: 'number', filterBy: 'number' },
    { label: 'Title', orderBy: 'name', filterBy: 'name' },
    { label: 'Fragment?', orderBy: 'fragment', filterBy: 'fragment', values: fragmentValues },
    { label: 'Clearance', orderBy: 'clearance', filterBy: 'clearance', values: clearanceValues },
    { label: 'Containment', orderBy: 'contain', filterBy: 'contain', values: containValues },
    { label: 'Secondary', orderBy: 'secondary', filterBy: 'secondary', values: secondaryValues },
    { label: 'Disruption', orderBy: 'disrupt', filterBy: 'disrupt', values: disruptValues },
    { label: 'Risk', orderBy: 'risk', filterBy: 'risk', values: riskValues }
	];

	const handler = new DataHandler(scps, { rowsPerPage: 50 })
	const rows = handler.getRows()

	$: data, handler.setRows(scps)
</script>

<Datatable {handler}>
	<table>
		<thead>
			<tr>
				{#each headers as { label, orderBy }}
				  <Th data-title {handler} align="center" {orderBy}>{label}</Th>
        {/each}				
			</tr>
			<tr>
				{#each headers as { filterBy, values }}
					{#if filterBy === 'number' || filterBy === 'name' }
				  	<ThTextFilter {handler} align="center" {filterBy} />
					{:else}
						<ThDropFilter {handler} align="center" {filterBy} {values} />
					{/if}
        {/each}
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr>
					<td class="{cellStyle(row.number)}">{@html linkFormatter(row.url, row.number)}</td>
					<td class="{cellStyle(row.name)}">{@html row.name}</td>
					<td class="{cellStyle(row.fragment)}">{row.fragment}</td>
					<td class="{clearStyle(row.clearance)}">{row.clearance}</td>
					<td class="{cellStyle(row.contain)}">{row.contain}</td>
					<td class="{cellStyle(row.secondary)}">{row.secondary}</td>
					<td class="{cellStyle(row.disrupt)}">{row.disrupt}</td>
					<td class="{cellStyle(row.risk)}">{row.risk}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Datatable>

<div>test</div>

<style>
	table {
		color: rgb(var(--swatch-text-general));
		font-family: var(--body-font);
		font-size: var(--base-font-size);
	}
	thead {
		font-family: var(--UI-font);
	}
	tbody td {
		border: 0.0625em solid rgb(var(--swatch-secondary-color));
		padding: 0.25em 1em;
	}
	tbody tr {
		transition: all, 0.2s;		
	}
	tbody tr:hover {
		background: rgb(var(--swatch-secondary-color));
	}
</style>
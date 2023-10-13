<script lang="ts">
	import type { DataHandler, Field, Comparator, Row } from '@vincjo/datatables'

	type T = $$Generic<Row>

	export let handler: DataHandler<T>
	export let filterBy: Field<T>
	export let align: 'left' | 'right' | 'center' = 'left'
	export let comparator: Comparator<T> | undefined = undefined;

	let value: string = ''

	handler.on('clearFilters', () => value = '')
</script>

<th class={$$props.class ?? ''}>
	<input
		style:text-align={align}
		type="text"
		placeholder={handler.i18n.filter}
		spellcheck="false"
		bind:value
		on:input={() => handler.filter(value, filterBy, comparator)}
	/>
</th>

<style>
	th {
		background: rgb(var(--swatch-secondary-color));
		border-bottom: 0.0625em solid rgb(var(--swatch-secondary-color));
	}
	:global(input) {
		width: 100%;
		height: 2em;
		padding: 0;
		text-align: center;
		outline: none;
		border-radius: 0;
		font-size: var(--base-font-size);
		font-family: var(--UI-font);

		&::placeholder {
			color: rgb(var(--swatch-text-tertiary-color));
			font-style: italic;
			text-align: center;
			font-size: calc(var(--base-font-size) * 0.875);
			font-weight: normal;
		}

		&:focus {
			text-align: center;
		}
	}
</style>

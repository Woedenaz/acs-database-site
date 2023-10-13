<script lang="ts">
	import type { DataHandler, Row } from '@vincjo/datatables'

	type T = $$Generic<Row>

	export let handler: DataHandler<T>
	export let small = false

	const rowsPerPage = handler.getRowsPerPage()

	const options = [5, 10, 20, 50, 100]
</script>

<aside class={$$props.class ?? ''}>
	{#if !small}
		<span>{handler.i18n.show}</span>
	{/if}
	<select bind:value={$rowsPerPage} on:change={() => handler.setPage(1)}>
		{#each options as option}
			<option value={option}>
				{option}
			</option>
		{/each}
	</select>
	{#if !small}
		<span>{handler.i18n.entries}</span>
	{/if}
</aside>

<style>
	aside {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 2em;
		color: rgb(var(--swatch-text-tertiary-color));		
	}
	select {
		margin: 0  0.25em;
		background: rgba(var(--swatch-primary-darker), 0.2);
		text-align: center;
		border-radius: 0.25em;
	}
</style>

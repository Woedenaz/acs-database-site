<script lang="ts">
	import type { DataHandler, Row } from '@vincjo/datatables';
	import { Search, RowsPerPage, RowCount, Pagination } from '$lib/components';

	type T = $$Generic<Row>;

	export let handler: DataHandler<T>;

	export let search = true;
	export let rowsPerPage = true;
	export let rowCount = true;
	export let pagination = true;

	let element: HTMLElement;
	let clientWidth = 1000;

	const height = (search || rowsPerPage ? 48 : 8) + (rowCount || pagination ? 48 : 8);

	handler.on('change', () => {
		if (element) element.scrollTop = 0;
	});
</script>

<section bind:clientWidth class={$$props.class ?? ''}>
	<header class:container={search || rowsPerPage}>
		{#if search}
			<Search {handler} />
		{/if}
		{#if rowsPerPage}
			<RowsPerPage {handler} small={clientWidth < 600} />
		{/if}
	</header>

	<article bind:this={element} style="height:calc(100vh - {height}px)">
		<slot />
	</article>

	<footer class:container={rowCount || pagination}>
		{#if rowCount}
			<RowCount {handler} small={clientWidth < 600} />
		{/if}
		{#if pagination}
			<Pagination {handler} small={clientWidth < 600} />
		{/if}
	</footer>
</section>

<style>
	section {
		height: 100%;
		min-height: 100vh;
	}

	section :global(table) {
		border-collapse: separate;
		border-spacing: 0;
		width: 100%;
	}

	section :global(thead) {
		position: sticky;
		inset-block-start: 0;
		z-index: 1;
	}

	section :global(tr) {
		--scps: 8vw;
		--names: 25vw;
		--frag: 6vw;
		--cols: calc(((100vw - (var(--scps) + var(--names) + var(--frag))) / 5) - 0.125em);

		display: grid;
		grid-template-columns:
			var(--scps) var(--names) var(--frag) var(--cols) var(--cols) var(--cols) var(--cols)
			var(--cols);
	}

	section :global(td) {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	header,
	footer {
		min-height: 0.5em;
		padding: 0 1em;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	header.container,
	footer.container {
		height: 3em;
	}

	footer {
		border-top: 0.0625em solid rgb(var(--swatch-secondary-color));
	}

	article {
		position: relative;
		overflow: auto;
		scrollbar-width: thin;
		display: grid;
		align-items: flex-start;
		grid-template-rows: 1fr;
		width: 100%;
	}

	article::-webkit-scrollbar {
		width: 0.3625em;
		height: 0.3625em;
	}
	article::-webkit-scrollbar-track {
		background: rgb(var(--swatch-secondary-color));
	}
	article::-webkit-scrollbar-thumb {
		background: rgb(var(--swatch-tertiary-color));
	}
	article::-webkit-scrollbar-thumb:hover {
		background: rgb(var(--swatch-alternate-color));
	}
</style>

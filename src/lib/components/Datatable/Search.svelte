<script lang="ts">
	import type { DataHandler, Row } from '@vincjo/datatables'

	type T = $$Generic<Row>

	export let handler: DataHandler<T>
	let value = ''

	handler.on('clearSearch', () => value = '')
</script>

<input
	class={$$props.class ?? ''}
	type="text"
	bind:value
	placeholder={handler.i18n.search}
	spellcheck="false"
	on:input={() => handler.search(value)}
/>

<style>
	input {
		border: 0.0625em solid rgb(var(--swatch-secondary-color));
		border-radius: 0.25em;
		outline: none;
		padding: 0 0.5em;
		line-height: 2em;
		margin: 0;
		height: 1.5em;
		background: transparent;
		width: 40%;
		max-width: 11em;
		min-width: 6em;
		transition: all, 0.1s;
	}
	input:focus {
		border: 0.0625em solid rgb(var(--swatch-secondary-color));
	}
	input::placeholder {
		color: rgb(var(--swatch-text-tertiary-color));
		line-height: 2em;
	}
</style>

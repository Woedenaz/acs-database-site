<script lang="ts">
	import type { DataHandler, Field, Comparator, Row } from '@vincjo/datatables'
  import Select from 'svelte-select/Select.svelte';

  type T = $$Generic<Row>

  type Item = {
    value: string;
    label: string;
  };

  export let handler: DataHandler<T>
  export let filterBy: Field<T>
  export let align: 'left' | 'right' | 'center' = 'left'
  export let values: string[] = [];
  export let comparator: Comparator<T> | undefined = undefined;

  let items: Item[] = values.map(item => ({
    value: item,
    label: item
  }));

  let justValue: string;

  const clear = () => {
    handler.filter(null, filterBy, comparator);
  }  
</script>

<th class={$$props.class ?? ''}>
  <Select
    {items}
    clearable={true}
    containerStyles="text-align: {align}"
    placeholder={handler.i18n.filter}
    inputAttributes={{ autocomplete: 'on' }}
    bind:justValue
    on:change={() => handler.filter(justValue, filterBy, comparator)}
    on:clear={clear}
    --height= "100%"
    --width= "100%"
    --padding= "0"
    --input-margin= "0"
    --input-padding= "0"
    --font-size= "calc(var(--base-font-size) * 0.875);"
    --background= "rgba(var(--swatch-primary-darker), 0.2)"
    --border-radius= "0"
    --value-container-padding= "0 0 0 1em"
    --clear-select-width= "calc(var(--base-font-size) * 0.875);"
    --clear-select-height= "calc(var(--base-font-size) * 0.875);"
    --selected-item-padding= "0 1em 0 0"
    --item-height= "2em"
    --item-line-height= "2em"
    --item-padding= "0 0.5em"
    --border-focused= "none"
  >
  <svelte:fragment slot="empty">{handler.i18n.filter}</svelte:fragment>
  </Select>
</th>

<style>
  :global(*) {
    box-sizing: border-box;
  }

	:global(th) {
		background: rgb(var(--swatch-secondary-color));
		border-bottom: 0.0625em solid rgb(var(--swatch-secondary-color));
    padding: 0.125em;
	}

  :global(.indicators) {
    padding: 0 0.25em 0 0
  }

  :global(.svelte-select.focused) {
    box-shadow: 0 0 0 0.125em rgb(var(--swatch-primary));
  }

  :global(.item) {
    text-align: left;
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
    }

    &:focus {
			text-align: center;
		}    
  }
</style>

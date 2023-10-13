<script lang="ts">
  import type { DataHandler, Field, Row } from '@vincjo/datatables'

  type T = $$Generic<Row>

  export let handler: DataHandler<T>
  export let orderBy: Field<T>
  export let align: 'left' | 'right' | 'center' = 'left'

  const identifier = orderBy?.toString()
  const sort = handler.getSort()
</script>

<th
  on:click={() => handler.sort(orderBy)}
  class:sortable={orderBy}
  class:active={$sort.identifier === identifier}
  class={$$props.class ?? ''}
>
  <div
    class="flex"
    style:justify-content={align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'}
  >
    <strong>
      <slot />
    </strong>
    <span class:asc={$sort.direction === 'asc'} class:desc={$sort.direction === 'desc'} />
  </div>
</th>

<style>
  th {
    background: rgb(var(--swatch-alternate-color));
		color: rgb(var(--swatch-text-secondary-color));
    padding: 0.5em 2.25em;
    white-space: nowrap;
    text-align: center;    
    font-size: 1.0625em;
    user-select: none;
    border-bottom: 0.0625em solid rgb(var(--swatch-secondary-color));
  }
  th.sortable {
    cursor: pointer;
  }
  th strong {
    white-space: pre-wrap;
    font-size: 0.875em;
    line-height: 1em;
  }
  th.sortable div.flex {
    padding: 0;
    display: flex;
    align-items: center;
    height: 100%;
  }
  th.sortable span {
    padding-left: 0.5em;
  }
  th.sortable span:before,
  th.sortable span:after {
    border: 0.25em solid transparent;
    content: '';
    display: block;
    height: 0;
    width: 0;
  }
  th.sortable span:before {
    border-bottom-color: rgb(var(--swatch-secondary-color));
    margin-top: 0.125em;
  }
  th.sortable span:after {
    border-top-color: rgb(var(--swatch-secondary-color));
    margin-top: 0.125em;
  }
  th.active.sortable span.asc:before {
    border-bottom-color: rgb(var(--swatch-tertiary-color));
  }
  th.active.sortable span.desc:after {
    border-top-color: rgb(var(--swatch-tertiary-color));
  }
  th:not(.sortable) span {
    visibility: hidden;
  }
</style>

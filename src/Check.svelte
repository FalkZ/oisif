<script lang="ts">
  import { onMount } from "svelte";

  import { Notomoji } from "@svgmoji/noto";
  import data from "svgmoji/emoji.json";

  const notomoji = new Notomoji({ data, type: "all" });

  const url = notomoji.url("✅");

  //const url = "";

  export let obj;
  export let editing;
  export let selected;
  export let insertAt;
  export let deleteAt;
  export let index;

  let input;

  onMount(() => {
    selected.subscribe((selected) => {
      if (index === selected) input?.focus();
    });
  });
</script>

<li
  class:editing
  on:click={() => {
    if (!editing) obj.done = !obj.done;
  }}
>
  <div class="check">{obj.done ? "✅" : ""}</div>
  <input
    on:focus={() => selected.set(index)}
    on:blur={({ target }) => {
      if (!target.value) deleteAt.set(index);
    }}
    on:keydown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        insertAt.set(index + 1);
        selected.update((v) => v + 1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        selected.update((v) => v + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        selected.update((v) => v - 1);
      }
    }}
    bind:this={input}
    type="text"
    disabled={!editing}
    bind:value={obj.text}
  />
</li>

<style>
  .check {
    width: 40px;
    line-height: 1em;
    text-align: center;
  }

  li.editing:last-child .check::before {
    content: "+";
    color: var(--grey);
  }

  input {
    box-sizing: border-box;
    width: calc(100% - 50px);
    display: inline-block;
    padding: 0;
    border: 0;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    background: none;
    outline: none;
  }
  input:disabled {
    pointer-events: none;
    color: inherit;
  }

  div {
    display: inline-block;
  }
  li {
    list-style: none;

    padding: 10px;
    cursor: pointer;
    user-select: none;
  }
  li:hover {
    background: rgba(204, 204, 221, 0.5);
  }
</style>

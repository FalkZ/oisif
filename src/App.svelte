<script lang="ts">
  import { writable } from "svelte/store";

  import Check from "./Check.svelte";
  import Convetti from "./Convetti.svelte";

  export let t;
  let tasks = t;

  $: console.log(tasks);

  export let save;

  let show = 0;

  let editing = false;

  $: if (editing && tasks[tasks.length - 1]?.text) {
    insertAt.set(tasks.length);
    tasks = tasks;
  }

  let selected = writable(0);
  let insertAt = writable(null);
  let deleteAt = writable(null);

  selected.subscribe((index) => {
    if (tasks.length) {
      if (index < 0) selected.set(0);
      if (index > tasks.length - 1) selected.set(tasks.length - 1);
    }
  });
  insertAt.subscribe((index) => {
    if (index !== null) {
      tasks.splice(index, 0, { text: "", done: false });
      tasks = tasks;
    }
  });

  deleteAt.subscribe((index) => {
    if (index !== null) {
      tasks.splice(index, 1);
      tasks = tasks;
    }
  });

  const showConvetti = () => {
    show = show + 1;
  };
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
    rel="stylesheet"
  />

  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Colr+Emoji+Glyf"
    rel="stylesheet"
  />
</svelte:head>

<ul
  on:click={() => {
    if (!editing) {
      save(tasks);
      if (tasks.length && tasks.reduce((acc, { done }) => acc && done, true))
        showConvetti();
    }
  }}
>
  {#each tasks as obj, index}
    <Check bind:obj {editing} {index} {selected} {insertAt} {deleteAt} />
  {/each}
</ul>

<button
  on:click={() => {
    editing = !editing;
    if (editing) tasks.push({ done: false, text: "" });
    else {
      tasks = tasks.filter(({ text }) => text);

      save(tasks);
    }
  }}>{editing ? "💾" : "📝"}</button
>

{#key show}
  <Convetti trigger={show} />
{/key}

<style>
  :global(html) {
    height: 100%;
    padding: 0;
    margin: 0;
  }
  :global(body) {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    margin: 0;
    position: absolute;
    padding: 0;
    font-size: 30px;
    background-color: white;
    /* #e6e6f7; */
  }

  :global(#app) {
    display: absolute;
  }
  :root {
    font-family: "FirefoxEmoji", "Quicksand", -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
    font-weight: 700;
    --grey: #e6e6f7;
  }
  :global(*) {
    color: rgb(17, 17, 87);
  }

  ul {
    padding: 0;
  }
  button {
    font-family: "FirefoxEmoji";
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: none;
    border: none;
    font-size: 30px;
  }
</style>

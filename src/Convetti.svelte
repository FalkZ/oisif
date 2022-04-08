<script lang="ts">
  import confetti from "canvas-confetti";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  let canvas;
  export let trigger;
  let show = trigger;

  onMount(() => {
    const myConfetti = confetti.create(canvas, {
      resize: true,
      //  useWorker: true
    });
    if (trigger) {
      myConfetti({
        particleCount: 100,
        spread: 160,
        angle: 45,
        // any other options from the global
        // confetti function
      });
    }

    setTimeout(() => {
      show = false;
    }, 3000);
  });
</script>

{#if show}
  <div out:fade>
    <canvas bind:this={canvas} />
    <div
      class="emoji"
      transition:scale={{
        duration: 300,
        // delay: 500,
        opacity: 0,
        start: 0.3,
        easing: quintOut,
      }}
    >
      🎉
    </div>
  </div>
{/if}

<style>
  canvas {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    pointer-events: none;
  }
  .emoji {
    pointer-events: none;
    position: fixed;
    top: 50%;
    right: 50%;
    text-shadow: 1px 3px 5px black;
    font-size: 50px;
  }
</style>

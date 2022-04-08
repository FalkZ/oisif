import App from "./App.svelte";
import { store } from "./Store";
import "./emoji.css";

window.onerror = (e) => {
  console.error("global error", e);
  store.reset();
};

(async () => {
  const app = new App({
    target: document.getElementById("app"),
    props: {
      t: await store.load(),
      save: (tasks) => store.save(tasks),
    },
  });
})();

import { Controller } from "./src/controller.mjs";

new Controller().run().catch((err) => {
  console.error(err);
  process.exit(1);
});

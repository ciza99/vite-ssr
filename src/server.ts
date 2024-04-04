import { fileURLToPath } from "node:url";
import path from "node:path";
import { createServer as createViteServer } from "vite";
import express from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = 3000;

export const createServer = async () => {
  const app = express();

  const viteServer = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(viteServer.middlewares);

  app.use("*", async () => {
    // serve index.html
  });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

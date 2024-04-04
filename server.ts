import { createServer as createViteServer } from "vite";
import express from "express";
import fs from "node:fs/promises";

const PORT = 3000;

const app = express();

const viteServer = await createViteServer({
  server: { middlewareMode: true },
  appType: "custom",
});

app.use(viteServer.middlewares);

app.use("*", async (req, res, next) => {
  const url = req.originalUrl;

  try {
    let template = await fs.readFile("./index.html", "utf-8");

    template = await viteServer.transformIndexHtml(url, template);

    const { render } = await viteServer.ssrLoadModule("/src/entry-server.tsx");

    const rendered = await render(url);
    const html = template.replace(`<!--ssr-outlet-->`, rendered.html);

    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error) {
    if (error instanceof Error) {
      viteServer.ssrFixStacktrace(error);
    }
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

import { Application, Router } from "@oak/oak";

const router = new Router();

router.get("/api/test", (ctx) => {
  ctx.response.body = "hello world";
})

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });

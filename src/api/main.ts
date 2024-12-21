import { Application, Router } from "@oak/oak";
import { sync_db, init_db } from "../db/db";

const router = new Router();

const db: DB = init_db();

router.post("/api/sync", (ctx) => {
  sync_db(db);
  ctx.response.body = {"status": 200};
})

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });

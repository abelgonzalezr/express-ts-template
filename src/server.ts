// src/server.ts
import { app } from "./app";
import config from "./shared/config";
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${config.app.port}`)
);

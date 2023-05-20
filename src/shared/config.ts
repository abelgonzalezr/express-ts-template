import * as dotenv from "dotenv";
import * as pjson from "../../package.json";
import * as swagger from "../../tsoa.json";
// initialize configuration
dotenv.config();

export default {
  app: {
    name: pjson.name,
    version: pjson.version,
    nodeEnv: process.env.NODE_ENV,
    port: parseInt(process.env.PORT||"3000"),
    prefix: swagger.spec.basePath||"/api",
  },
  JWT: {
    SECRET: process.env.SECRET_KEY||"secret",
    EXPIRE: "1h"
  },
};

// src/app.ts
import express, {json, urlencoded,  Response as ExResponse, Request as ExRequest, NextFunction} from "express";
import { RegisterRoutes } from "../build/routes";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";
import * as swaggerDoc from "../build/swagger.json";
export const app = express();


const swaggerOptions = {
  swaggerOptions: {
    url: "/docs/swagger.json",
},
}

// Use body parser to read sent json payloads
app.use(
  urlencoded({
    extended: true,
  })
);

app.use(json());
app.get("/docs/swagger.json", (req, res) => res.json(swaggerDoc));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc,swaggerOptions));
RegisterRoutes(app);

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: "Not Found",
  });
});



app.use(function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
  ): ExResponse | void {

    
    if (err instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
      return res.status(422).json({
        message: "Validation Failed",
        details: err?.fields,
      });
    }
    if (err instanceof Error) {
      if (err.hasOwnProperty('status')) {
        res.status(401).json({ message: 'Unauthorized' });
      } 
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  
    next();
  });

import * as express from "express";
import * as jwt from "jsonwebtoken";
import config from "./src/shared/config";
export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {

  if (securityName === "jwt") {
    const authHeader = request.headers.authorization;
    const token = authHeader ? authHeader.replace('Bearer ', '') : undefined;

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided"));
        return;
      }
      jwt.verify(token, config.JWT.SECRET, function (err: any, decoded: any) {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }

  return Promise.reject(new Error("Invalid token"));
}

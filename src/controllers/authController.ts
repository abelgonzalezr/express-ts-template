import { Controller, Post, Body, Route } from "tsoa";
import * as jwt from "jsonwebtoken";
import config from "../shared/config";
@Route("auth")
export class AuthController extends Controller {
  @Post("token")
  public async generateToken(
    @Body() requestBody: { username: string; password: string }
  ): Promise<any> {
    const { username, password } = requestBody;

    // verify user and password
    const isValidUser = await authenticateUser(username, password);

    if (isValidUser) {
      // Create TOKEN with secret key
      const token = jwt.sign({ username }, config.JWT.SECRET, {
        expiresIn: config.JWT.EXPIRE,
      });

      // return generate token
      return { token: token };
    } else {
      throw new Error("Ivalid Credentials");
    }
  }
}

async function authenticateUser(
  username: string,
  password: string
): Promise<boolean> {
  // Here you should implement the logic to verify if the username and password are valid
  // You can query a database, call an authentication service, etc.
  // Return true if the user is valid and false if it is not
  // Here is a basic example:

  const validUsername = "admin";
  const validPassword = "admin";

  if (username === validUsername && password === validPassword) {
    return true;
  } else {
    return false;
  }
}

import { User } from "./user";


export type UserCreationParams = Pick<User, "email" | "name">;

export class UsersService {
  public get(id: number, name?: string): User {
    return {
      id,
      email: "jane@doe.com",
      name: name ?? "Jane Doe",
    };
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: Math.floor(Math.random() * 10000), 
      ...userCreationParams,
    };
  }
}

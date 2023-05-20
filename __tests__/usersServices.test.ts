import { UsersService } from "../src/services/usersService";

describe("get", () => {
    it("get one user", () => {
      const result = new UsersService().get(4,'test')
      expect(result).toEqual({
        id:4,
        email: "jane@doe.com",
        name: "test",
      });
    });
  });
const UserService = require("../user_service");
const UserClient = require("../user_client");
jest.mock("../user_client");

describe("UserService", () => {
  const login = jest.fn(async () => "success");
  UserClient.mockImplementation(() => {
    return {
      login,
    };
  });

  /**
   * @type {UserService}
   */
  let userService;

  beforeEach(() => {
    userService = new UserService(new UserClient());
  });

  it("calls login() on UserClient when tries to login", async () => {
    await userService.login("yk", "pass");
    expect(login.mock.calls.length).toBe(1);
  });

  it("should not call login() on UserClient again if already logged in", async () => {
    await userService.login("yk", "pass");
    await userService.login("yk", "pass");

    expect(login.mock.calls.length).toBe(1);
  });
});

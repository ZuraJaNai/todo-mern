import configureMockStore from "redux-mock-store";
import moxios from "moxios";
import thunk from "redux-thunk";
import jwt_decode from "jwt-decode";
import { registerUser, loginUser, logoutUser } from "../../actions/authActions";
import { GET_ERRORS, SET_CURRENT_USER } from "../../actions/types";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOGY5ZTY4Zjc5MTdkMzlmODczZDk5ZiIsIm5hbWUiOiJuY2trdnRuIiwiaWF0IjoxNTU0NzE2MjI2LCJleHAiOjE1NTQ4MDI2MjZ9.DFVkPD_6rXvC8pfhmYud3JNObvUi6UC6Ao3AIdpJ89o";

describe("Register actions", () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it("creates GET_ERRORS on failed register", async () => {
    moxios.stubRequest("/api/users/register", {
      status: 400,
      response: {
        registerErr: "Register error",
      },
    });
    const expectedAction = [
      {
        type: GET_ERRORS,
        payload: {
          registerErr: "Register error",
        },
      },
    ];
    const store = mockStore({});
    await store.dispatch(registerUser({}));
    expect(store.getActions()).toEqual(expectedAction);
  });
});

describe("Login/Logout actions", () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it("creates SET_CURRENT_USER with empty object on logout", async () => {
    const expectedAction = [
      {
        type: SET_CURRENT_USER,
        payload: {},
      },
    ];
    const store = mockStore({});
    await store.dispatch(logoutUser());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it("creates SET_CURRENT_USER with user on sucessfull login", async () => {
    moxios.stubRequest("/api/users/login", {
      status: 200,
      response: {
        token: TOKEN,
      },
    });
    const expectedAction = [
      {
        type: SET_CURRENT_USER,
        payload: jwt_decode(TOKEN),
      },
    ];
    const store = mockStore({});
    await store.dispatch(loginUser({}));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it("creates GET_ERRORS on failed login", async () => {
    moxios.stubRequest("/api/users/login", {
      status: 400,
      response: {
        loginErr: "Login error",
      },
    });
    const expectedAction = [
      {
        type: GET_ERRORS,
        payload: {
          loginErr: "Login error",
        },
      },
    ];
    const store = mockStore({});
    await store.dispatch(loginUser({}));
    expect(store.getActions()).toEqual(expectedAction);
  });
});

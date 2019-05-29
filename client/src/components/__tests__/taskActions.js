import configureMockStore from "redux-mock-store";
import moxios from "moxios";
import thunk from "redux-thunk";
import { initializeTasks } from "../../actions/tasksActions";
import { GET_ERRORS, SET_TASKS } from "../../actions/types";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Task actions", () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it("calls initializeTasks to create SET_TASKS action", async () => {
    moxios.stubRequest("/api/tasks", {
      status: 200,
      response: [{ name: "some task" }],
    });
    const expectedAction = [
      {
        type: SET_TASKS,
        payload: [{ name: "some task" }],
      },
    ];
    const store = mockStore({});
    await store.dispatch(initializeTasks({}));
    expect(store.getActions()).toEqual(expectedAction);
  });
});

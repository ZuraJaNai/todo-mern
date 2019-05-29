import React from "react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { createRender } from "@material-ui/core/test-utils";
import Task from "../Task";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({ types: {} });

Enzyme.configure({ adapter: new Adapter() });

describe("Task component", () => {
  let render;

  beforeEach(() => {
    render = createRender();
  });

  it("creates new empty task", () => {
    let addUserTask = jest.fn();
    const wrapper = render(
      <Provider store={store}>
        <Task mode={"add"} addTask={addUserTask} />
      </Provider>
    ).dive();
    let container = wrapper.find(".firstDiv");
    //container.simulate(".paper");
    console.log("len = " + container.length);
  });
});

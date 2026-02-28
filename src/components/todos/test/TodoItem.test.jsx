import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "@/store/slices/todoSlice";
import TodoItem from "../TodoItem";
import {  test, expect } from "vitest";

const store = configureStore({
  reducer: { todos: todoReducer },
});

test("match snapshot", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <TodoItem todo={{ id: 1, title: "Test Todo", completed: false }} />
    </Provider>,
  );

  expect(asFragment()).toMatchSnapshot();
});

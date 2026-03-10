import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "@/store/slices/todoSlice";
import TodoList from "../TodoList";
import { describe, test, expect } from "vitest";

function renderWithStore(preloadedState) {
  const store = configureStore({
    reducer: { todos: todoReducer },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <TodoList />
    </Provider>,
  );
}

describe("TodoList Component", () => {
  test("menampilkan todo pending dan completed dengan benar", () => {
    const mockState = {
      todos: {
        items: [
          { id: 1, title: "Todo 1", completed: false },
          { id: 2, title: "Todo 2", completed: false },
          { id: 3, title: "Todo 3", completed: true },
        ],
        loading: false,
      },
    };

    renderWithStore(mockState);

    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
    expect(screen.getByText("Todo 3")).toBeInTheDocument();

    // Badge Pending
    expect(screen.getByText("2")).toBeInTheDocument();

    // Badge Completed
    expect(screen.getByText("1 de 3")).toBeInTheDocument();
  });

  test("snapshot TodoList", () => {
    const mockState = {
      todos: {
        items: [{ id: 1, title: "Snapshot Todo", completed: false }],
        loading: false,
      },
    };

    const { asFragment } = renderWithStore(mockState);

    expect(asFragment()).toMatchSnapshot();
  });
});

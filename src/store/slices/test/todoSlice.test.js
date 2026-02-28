import todoReducer from "../todoSlice";
import { describe, test, expect } from "vitest";

describe("todoSlice reducer", () => {
  const initialState = {
    items: [],
    loading: false,
  };

  test("should return initial state", () => {
    expect(todoReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  test("should handle fetchTodos.pending", () => {
    const action = { type: "todos/fetchTodos/pending" };
    const state = todoReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  test("should handle fetchTodos.fulfilled", () => {
    const todos = [{ id: 1, title: "Test", completed: false }];

    const action = {
      type: "todos/fetchTodos/fulfilled",
      payload: todos,
    };

    const state = todoReducer(initialState, action);

    expect(state.items).toEqual(todos);
    expect(state.loading).toBe(false);
  });

  test("should handle addTodo.fulfilled", () => {
    const action = {
      type: "todos/addTodo/fulfilled",
      payload: { id: 1, title: "New Todo", completed: false },
    };

    const state = todoReducer(initialState, action);

    expect(state.items.length).toBe(1);
    expect(state.items[0].title).toBe("New Todo");
  });

  test("should handle deleteTodo.fulfilled", () => {
    const startState = {
      items: [
        { id: 1, title: "Todo 1", completed: false },
        { id: 2, title: "Todo 2", completed: false },
      ],
      loading: false,
    };

    const action = {
      type: "todos/deleteTodo/fulfilled",
      payload: 1,
    };

    const state = todoReducer(startState, action);

    expect(state.items.length).toBe(1);
    expect(state.items[0].id).toBe(2);
  });

  test("should handle toggleTodo.fulfilled", () => {
    const startState = {
      items: [{ id: 1, title: "Todo 1", completed: false }],
      loading: false,
    };

    const action = {
      type: "todos/toggleTodo/fulfilled",
      payload: { id: 1, title: "Todo 1", completed: true },
    };

    const state = todoReducer(startState, action);

    expect(state.items[0].completed).toBe(true);
  });
});

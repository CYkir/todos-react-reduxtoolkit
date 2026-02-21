import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTodosAPI,
  addTodoAPI,
  deleteTodoAPI,
  updateTodoAPI,
} from "../../api/todoApi";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  return await fetchTodosAPI();
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  await addTodoAPI(todo);

  return {
    id: Date.now(),
    title: todo.title,
    completed: false,
    userId: todo.userId,
  };
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  try {
    await deleteTodoAPI(id);
  } catch (err) {}
  return id;
});

export const toggleTodo = createAsyncThunk("todos/toggleTodo", async (todo) => {
  const updated = {
    ...todo,
    completed: !todo.completed,
  };

  try {
    await updateTodoAPI(todo.id, updated);
  } catch (err) {}

  return updated;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })

      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })

      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload);
      })

      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (todo) => todo.id === action.payload.id,
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default todoSlice.reducer;

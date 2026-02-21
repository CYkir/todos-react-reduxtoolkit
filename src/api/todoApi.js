import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchTodosAPI = async () => {
  try {
    const response = await api.get("/todos", {
      params: { _limit: 10 },
    });
    return response.data;
  } catch (error) {
    throw new Error("Gagal mengambil data todo", `message : ${error}`);
  }
};

export const addTodoAPI = async (todo) => {
  try {
    const response = await api.post("/todos", todo);
    return response.data;
  } catch (error) {
    throw new Error("Gagal menambahkan  todo", `message : ${error}`);
  }
};

export const deleteTodoAPI = async (id) => {
  try {
    await api.delete(`/todos/${id}`);
    return id;
  } catch (error) {
    throw new Error("Gagal menghapus todo", `message : ${error}`);
  }
};

export const updateTodoAPI = async (id, updatedTodo) => {
  try {
    const response = await api.put(`/todos/${id}`, updatedTodo);
    return response.data;
  } catch (error) {
    throw new Error(`message : ${error}`);
  }
};

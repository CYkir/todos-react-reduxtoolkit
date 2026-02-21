import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTodos } from "./store/slices/todoSlice";
import Header from "./components/layout/Header";
import TodoForm from "./components/todos/TodoForm";
import TodoList from "./components/todos/TodoList";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#f2f2f2] dark:bg-[#191919] transition-all relative">
      <Header />
      <main className="md:w-5/12 w-11/12 mx-auto p-4">
        <TodoForm />
        <TodoList />
      </main>
    </div>
  );
}

export default App;

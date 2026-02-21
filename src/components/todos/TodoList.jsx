import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { items } = useSelector((state) => state.todos);

  const pending = items.filter((todo) => !todo.completed);
  const completed = items.filter((todo) => todo.completed);

  const total = items.length;
  const completedCount = completed.length;

  return (
    <section className="space-y-8 my-20">
      <div>
        <div className="flex  justify-between mb-4">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-[#4EA8DE] font-semibold font-inter">
              Belum Selesai
            </h2>
            <span className=" bg-[#4EA8DE] dark:bg-[#262626] font-semibold text-[#f2f2f2] dark:text-gray-400 px-2 py-1 rounded-full">
              {pending.length}
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-[#8284FA] font-semibold  font-inter">
              Selesai
            </h2>

            <span
              className="px-4 py-1 text-sm font-semibold
    text-[#f2f2f2]
    bg-[#8284FA]
    rounded-full shadow-sm font-inter dark:bg-[#262626] dark:text-gray-400 "
            >
              {completedCount} de {total}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {pending.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>

      <div>
        <div className="space-y-3">
          {completed.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../../store/slices/todoSlice";
import { useState, useCallback, memo } from "react";
import { Icon } from "@iconify/react";
import { lazy, Suspense } from "react";
import Loader from "../common/Loader";

const ConfirmModal = lazy(() => import("../common/ConfirmModal"));

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const handleToggle = useCallback(() => {
    dispatch(toggleTodo(todo));
  }, [dispatch, todo]);

  const handleDelete = useCallback(() => {
    dispatch(deleteTodo(todo.id));
  }, [dispatch, todo.id]);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <>
      <article
        className={`flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-300 font-inter ${
          todo.completed
            ? "bg-[#d9d9d9] dark:bg-[#262626]"
            : "bg-white dark:bg-[#262626] hover:shadow-md border-2 border-gray-800"
        } border-gray-200 dark:border-gray-700`}
      >
        <div className="flex items-center gap-3">
          <button onClick={handleToggle} className="transition">
            {todo.completed ? (
              <Icon
                icon="icon-park-solid:check-one"
                width="24"
                height="24"
                color="#7B7CD4"
              />
            ) : (
              <div className="w-5 h-5 border-2 border-gray-800 dark:border-[#4EA8DE] rounded-full" />
            )}
          </button>

          <span
            className={`text-sm sm:text-base ${
              todo.completed
                ? "line-through text-gray-400"
                : "text-gray-800 dark:text-gray-200"
            }`}
          >
            {todo.title}
          </span>
        </div>

        <button
          onClick={openModal}
          className="text-gray-800 dark:text-gray-400 hover:text-red-500 transition"
        >
          <Trash2 size={18} />
        </button>
      </article>

      <Suspense fallback={<Loader text="Memuat konfirmasi..." />}>
        <ConfirmModal
          isOpen={modalOpen}
          onClose={closeModal}
          onConfirm={handleDelete}
          message={`Hapus "${todo.title}"?`}
        />
      </Suspense>
    </>
  );
}

export default memo(TodoItem);

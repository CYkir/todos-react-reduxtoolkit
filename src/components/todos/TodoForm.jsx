import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/slices/todoSlice";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = title.trim();

    if (!trimmed) {
      setError("Todo tidak boleh kosong!");
      return;
    }
    if (trimmed.length < 3) {
      setError("Minimal 3 karakter.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      await dispatch(
        addTodo({
          title: trimmed,
          completed: false,
          userId: 1,
        }),
      ).unwrap();

      setTitle("");
    } catch (err) {
      setError("Gagal menambahkan todo!", `message: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="my-8 absolute top-32 md:top-40 left-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2   w-5/12 p-4">
      <form className="flex  gap-3 " onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tambah tugas baru"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          className="flex-1 px-5 py-3 rounded-md border
          bg-[#f2f2f2] dark:bg-[#262626]
          border-[#808080] dark:border-black
          focus:outline-none focus:ring-2 focus:ring-[#1E6F9F] transition font-inter
          disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 dark:text-gray-300"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 rounded-md bg-[#1E6F9F] hover:bg-[#185b82] text-white flex items-center gap-2 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed font-inter"
        >
          {loading && (
            <div className="w-4 h-4 border-2 border-white border-dashed rounded-full animate-spin"></div>
          )}
          <span className="hidden md:inline">Tambah</span>{" "}
          <span>
            <CirclePlus size={18} />
          </span>
        </button>
      </form>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </section>
  );
}

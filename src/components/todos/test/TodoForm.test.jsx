import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "@/store/slices/todoSlice";
import TodoForm from "../TodoForm";
import { describe, test, expect } from "vitest";

function renderWithRedux(component) {
  const store = configureStore({
    reducer: { todos: todoReducer },
  });

  return render(<Provider store={store}>{component}</Provider>);
}

describe("TodoForm", () => {
  test("menampilkan error jika kosong", async () => {
    renderWithRedux(<TodoForm />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(
      await screen.findByText("Todo tidak boleh kosong!"),
    ).toBeInTheDocument();
  });

  test("input berubah saat diketik", () => {
    renderWithRedux(<TodoForm />);
    const input = screen.getByPlaceholderText("Tambah tugas baru");

    fireEvent.change(input, { target: { value: "Belajar React" } });

    expect(input.value).toBe("Belajar React");
  });
});

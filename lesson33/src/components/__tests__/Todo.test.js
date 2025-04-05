import { render, screen, fireEvent } from "@testing-library/react";
import { TodoContextProvider } from "../../context";
import { TodoForm } from "../../components";

function setup() {
  render(
    <TodoContextProvider>
      <h1>TODO</h1>
      <TodoForm />
    </TodoContextProvider>
  );
}

describe("Todo testing", () => {
  it("1. Сторінка має заголовок TODO", () => {
    setup();
    expect(screen.getByText("TODO")).toBeInTheDocument();
  });

  it("2. У поле для тексту можна ввести як цифри, так і букви", () => {
    setup();
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Задача123" } });
    expect(input.value).toBe("Задача123");
  });

  it("3. Натискання на кнопку 'Додати' без тексту викликає помилку", async () => {
    setup();
    fireEvent.click(screen.getByText("Добавить"));
    expect(await screen.findByText(/Поле обов'язкове/i)).toBeInTheDocument();
  });

  it("4. Після введення тексту і натискання 'Додати' з'являється нова задача", async () => {
    setup();
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Купити хліб" } });
    fireEvent.click(screen.getByText("Добавить"));
    expect(await screen.findByText("Купити хліб")).toBeInTheDocument();
  });

  it("5. Можна видалити задачу зі списку", async () => {
    setup();
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Прибрати кімнату" } });
    fireEvent.click(screen.getByText("Добавить"));
    const task = await screen.findByText("Прибрати кімнату");
    expect(task).toBeInTheDocument();

    fireEvent.click(screen.getByText("Удалить"));
    expect(task).not.toBeInTheDocument();
  });
});

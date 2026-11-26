export async function fetchTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");

  if (!response.ok) {
    throw new Error("fetching todos failed");
  }

  return response.json();
}

export async function patchTodo({ id, title, completed }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed }),
    },
  );

  if (!response.ok) {
    throw new Error("Todo-ს განახლება ვერ მოხერხდა");
  }

  return response.json();
}

export async function fetchTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");

  if (!response.ok) {
    throw new Error("fetching todos failed");
  }

  return response.json();
}

import { Platform } from "react-native";

const API_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:3001/api"
    : "http://localhost:3001/api";

export async function fetchTodos() {
  const response = await fetch(`${API_URL}/todos`);

  if (!response.ok) {
    throw new Error("fetching todos failed");
  }

  return response.json();
}

export async function patchTodo({ id, title, completed }) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed }),
  });

  if (!response.ok) {
    throw new Error("Todo-ს განახლება ვერ მოხერხდა");
  }

  return response.json();
}

import { StyleSheet, Text, View } from "react-native";

export async function fetchTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");

  if (!response.ok) {
    throw new Error("fetching todos failed");
  }

  return response.json();
}

export default function TodoCard({ todo }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{todo.title}</Text>

      <Text
        style={[
          styles.status,
          todo.completed ? styles.completed : styles.pending,
        ]}
      >
        {todo.completed ? "completed" : "pending"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
  },
  completed: {
    color: "#15803d",
  },
  pending: {
    color: "#b45309",
  },
});

import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function TodoCard({ todo, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(todo)}
      activeOpacity={0.7}
    >
      <Text style={styles.title}>{todo.title}</Text>
      <Text style={todo.completed ? styles.completed : styles.pending}>
        {todo.completed ? "Completed" : "Not completed"}
      </Text>
    </TouchableOpacity>
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
  completed: {
    color: "#15803d",
  },
  pending: {
    color: "#b45309",
  },
});

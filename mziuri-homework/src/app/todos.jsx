import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TodoCard from "./components/TodoCard";
import { fetchTodos } from "./services/todos";

export default function TodosScreen() {
  const queryClient = useQueryClient();

  const {
    data: todos = [],
    isPending,
    isError,
    error,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const [editingTodo, setEditingTodo] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedCompleted, setEditedCompleted] = useState(false);

  const updateTodo = useMutation({
    mutationFn: async (todo) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: todo.title,
            completed: todo.completed,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Todo-ს განახლება ვერ მოხერხდა");
      }

      return response.json();
    },

    onSuccess: (updatedTodo) => {
      queryClient.setQueryData(["todos"], (currentTodos = []) =>
        currentTodos.map((todo) =>
          todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo,
        ),
      );

      setEditingTodo(null);
    },
  });

  const openEditModal = (todo) => {
    updateTodo.reset();
    setEditingTodo(todo);
    setEditedTitle(todo.title);
    setEditedCompleted(todo.completed);
  };

  const closeEditModal = () => {
    setEditingTodo(null);
    updateTodo.reset();
  };

  const saveTodo = () => {
    if (!editingTodo || !editedTitle.trim()) {
      return;
    }

    updateTodo.mutate({
      id: editingTodo.id,
      title: editedTitle.trim(),
      completed: editedCompleted,
    });
  };

  if (isPending) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Fetching todos...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>
          {error.message || "Fetching todos failed"}
        </Text>

        <TouchableOpacity style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.heading}>Todo List</Text>

      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoCard todo={item} onPress={openEditModal} />
        )}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        onRefresh={refetch}
        refreshing={isRefetching}
        ListEmptyComponent={
          <Text style={styles.message}>No todo items found.</Text>
        }
      />

      <Modal
        visible={editingTodo !== null}
        transparent
        animationType="fade"
        onRequestClose={closeEditModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalHeading}>Edit Todo</Text>

            <TextInput
              style={styles.input}
              value={editedTitle}
              onChangeText={setEditedTitle}
              placeholder="Todo title"
            />

            <View style={styles.statusRow}>
              <Text>Completed</Text>
              <Switch
                value={editedCompleted}
                onValueChange={setEditedCompleted}
              />
            </View>

            {updateTodo.isError ? (
              <Text style={styles.error}>{updateTodo.error.message}</Text>
            ) : null}

            <View style={styles.actions}>
              <TouchableOpacity onPress={closeEditModal}>
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={saveTodo}
                disabled={!editedTitle.trim() || updateTodo.isPending}
              >
                <Text style={styles.saveText}>
                  {updateTodo.isPending ? "Saving..." : "Update"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    paddingVertical: 16,
  },
  list: {
    paddingBottom: 16,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  message: {
    marginTop: 12,
    color: "#4b5563",
  },
  error: {
    color: "#b91c1c",
    marginTop: 8,
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  retryText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 7,
    padding: 12,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  saveText: {
    color: "#2563eb",
    fontWeight: "700",
  },
});

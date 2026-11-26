import { useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ActivityIndicator,
  Button,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { fetchTodos, patchTodo } from "../../../services/todos";
import { styles } from "../../../styles/todos";

export default function TodoDetailsScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const [editedTitle, setEditedTitle] = useState(null);
  const [editedCompleted, setEditedCompleted] = useState(null);

  const {
    data: todos,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    refetchOnMount: false,
  });

  const updateTodo = useMutation({
    mutationFn: patchTodo,
    onSuccess: (savedTodo) => {
      queryClient.setQueryData(["todos"], (currentTodos = []) =>
        currentTodos.map((todo) =>
          todo.id === savedTodo.id ? { ...todo, ...savedTodo } : todo,
        ),
      );

      if (navigation.isFocused()) navigation.goBack();
    },
  });

  if (isPending) {
    return <ActivityIndicator style={styles.center} size="large" />;
  }

  const todo = todos?.find((item) => String(item.id) === id);

  if (!todo) {
    return (
      <View style={styles.center}>
        <Text>{error?.message ?? "Todo not found."}</Text>
        {error && <Button title="Retry" onPress={() => refetch()} />}
      </View>
    );
  }

  const title = editedTitle ?? todo.title;
  const completed = editedCompleted ?? todo.completed;

  function saveTodo() {
    updateTodo.mutate({ id: todo.id, title: title.trim(), completed });
  }

  return (
    <View style={styles.screen}>
      <View style={styles.form}>
        <Text style={styles.formTitle}>Todo #{todo.id}</Text>

        <TextInput
          style={styles.input}
          placeholder="Todo title"
          value={title}
          onChangeText={setEditedTitle}
        />

        <View style={styles.statusRow}>
          <Text>Completed</Text>
          <Switch value={completed} onValueChange={setEditedCompleted} />
        </View>

        {updateTodo.isError && (
          <Text style={styles.error}>{updateTodo.error.message}</Text>
        )}

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            disabled={updateTodo.isPending}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={saveTodo}
            disabled={!title.trim() || updateTodo.isPending}
          >
            <Text style={styles.saveText}>
              {updateTodo.isPending ? "Saving..." : "Update"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

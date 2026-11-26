import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TodoCard from "../../../components/TodoCard";
import { fetchTodos } from "../../../services/todos";
import { styles } from "../../../styles/todos";

export default function TodosScreen() {
  const router = useRouter();

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
          <TodoCard
            todo={item}
            onPress={(todo) => router.push(`/todos/${todo.id}`)}
          />
        )}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        onRefresh={refetch}
        refreshing={isRefetching}
        ListEmptyComponent={
          <Text style={styles.message}>No todo items found.</Text>
        }
      />
    </SafeAreaView>
  );
}

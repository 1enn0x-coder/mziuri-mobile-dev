import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ItemForm from "../../components/ItemForm";
import ItemList from "../../components/ItemList";
import { styles } from "../../styles/items";

export default function Index() {
  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    const item = {
      ...newItem,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    };

    setItems((currentItems) => [item, ...currentItems]);
  };

  const listHeader = (
    <View>
      <Link href="/todos" asChild>
        <TouchableOpacity style={navigationStyles.button} activeOpacity={0.7}>
          <Text style={navigationStyles.buttonText}>View Todos</Text>
        </TouchableOpacity>
      </Link>

      <ItemForm onAddItem={addItem} />
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <ItemList items={items} header={listHeader} />
    </SafeAreaView>
  );
}

const navigationStyles = StyleSheet.create({
  button: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 7,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

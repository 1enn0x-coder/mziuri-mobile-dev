import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/items";

export default function ItemCard({ item }) {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>

      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => setCount((currentCount) => currentCount + 1)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Press ({count})</Text>
      </TouchableOpacity>
    </View>
  );
}

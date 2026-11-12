import { FlatList, Text } from "react-native";
import ItemCard from "./ItemCard";
import { styles } from "../styles/items";

export default function ItemList({ items, header }) {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => <ItemCard item={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <Text style={styles.emptyMessage}>this card is empty</Text>
      }
      contentContainerStyle={styles.listContent}
      keyboardShouldPersistTaps="handled"
    />
  );
}

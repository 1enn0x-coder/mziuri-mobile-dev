import { Stack } from "expo-router";

export const unstable_settings = { anchor: "index" };

export default function TodosLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Todo List", headerShown: false }}
      />
      <Stack.Screen name="[id]" options={{ title: "Todo Details" }} />
    </Stack>
  );
}

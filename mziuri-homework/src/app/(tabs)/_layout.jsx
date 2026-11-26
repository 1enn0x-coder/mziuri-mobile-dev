import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Items",
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name={{
                ios: "square.grid.2x2",
                android: "grid_view",
                web: "grid_view",
              }}
              tintColor={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="todos"
        options={{
          title: "Todos",
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name={{
                ios: "checklist",
                android: "checklist",
                web: "checklist",
              }}
              tintColor={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}

import { Tabs } from "expo-router";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function DashboardLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#7B7878",
          paddingTop: 10,
          height: 90,
        },
        tabBarActiveTintColor: "#2C6E49",
        tabBarInactiveTintColor: "#FFF",
      }}
    >
      <Tabs.Screen
        name="shopping"
        options={{
          title: "Shopping",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name="cart"
              color={focused ? "#2C6E49" : "#FFF"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="reward"
        options={{
          title: "Reward",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name="gift"
              color={focused ? "#2C6E49" : "#FFF"}
            />
          ),
        }}
      />
    </Tabs>
  );
}

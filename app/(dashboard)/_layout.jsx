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
        tabBarActiveTintColor: "#DFB6CF",
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
              color={focused ? "#DFB6CF" : "#FFF"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name="home"
              color={focused ? "#DFB6CF" : "#FFF"}
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
              color={focused ? "#DFB6CF" : "#FFF"}
            />
          ),
        }}
      />
    </Tabs>
  );
}

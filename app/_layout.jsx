import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import { UserContext } from "../context/UserContext";

const RootLayout = () => {
  // User state stored here and shared via context
  const [username, setUsername] = useState(null);
  const [preferences, setPreferences] = useState(null);

  return (
    <UserContext.Provider value={{ username, setUsername, preferences, setPreferences }}>
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#2C6E49" },  // match UsernameSetup green
            headerTintColor: "#EBE9E3",                    // light text color for back button & header
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#EBE9E3",
            },
            headerTitle: "",  // no default title text
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,  // hide header on welcome/index screen
            }}
          />
          <Stack.Screen
            name="usernamesetup"
            options={{
              headerShown: true,   // show header for username setup
              headerBackTitleVisible: false, // optionally hide back button text
            }}
          />
          <Stack.Screen
            name="(dashboard)"
            options={{
              headerShown: false,  // no header on dashboard
            }}
          />
        </Stack>
      </View>
    </UserContext.Provider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
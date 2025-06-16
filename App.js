// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import your screens
import Welcome from "./app/dashboard/welcome";
import UsernameSetup from "./app/dashboard/usernamesetup";
import Questionnaire from "./app/dashboard/questionnaire";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="UsernameSetup" component={UsernameSetup} />
        <Stack.Screen name="Questionnaire" component={Questionnaire} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
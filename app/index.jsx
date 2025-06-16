import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push("/usernamesetup");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.jpg")} style={styles.logo} />

      <Text style={styles.title}>Welcome to Pokecoders</Text>
      <Text style={styles.subtitle}>
        Discover ethical fashion tailored to you
      </Text>

      <Pressable
        onPress={handleStart}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressedButton,
        ]}
        hitSlop={20}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBE9E3",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  logo: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2C6E49",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 40,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 300,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#2C6E49",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  pressedButton: {
    backgroundColor: "#245B3A",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
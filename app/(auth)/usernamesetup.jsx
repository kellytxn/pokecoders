import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

const UsernameSetup = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleNext = () => {
    const trimmed = username.trim();
    if (trimmed.length > 0) {
      router.push("/questionnaire");
    } else {
      alert("Please enter a username");
    }
  };

  const isDisabled = username.trim().length === 0;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.label}>Choose your username</Text>
      <TextInput
        style={styles.input}
        placeholder="Your username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Pressable
        onPress={handleNext}
        disabled={isDisabled}
        style={({ pressed }) => [
          styles.button,
          pressed && !isDisabled && styles.pressedButton,
          isDisabled && styles.disabledButton,
        ]}
      >
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default UsernameSetup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBE9E3",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  label: {
    fontSize: 20,
    color: "#2C6E49",
    marginBottom: 15,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#F3F5F9",
    fontSize: 16,
    color: "#333",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#2C6E49",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
  },
  pressedButton: {
    backgroundColor: "#245B3A",
  },
  disabledButton: {
    backgroundColor: "#999",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { UserContext } from "../../context/UserContext";
import { BACKEND_URL } from "../config";

const UsernameSetup = () => {
  const router = useRouter();
  const { setUsername, setPreferences } = useContext(UserContext);

  const [usernameInput, setUsernameInput] = useState("");
  const [loading, setLoading] = useState(false);

  const checkUsernameExists = async (username) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/preferences/${encodeURIComponent(username)}`);
      if (response.status === 404) {
        // User not found => new user
        return null;
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      alert("Network error, please try again.");
      return null;
    }
  };

  const handleNext = async () => {
    const trimmed = usernameInput.trim();
    if (trimmed.length === 0) {
      alert("Please enter a username");
      return;
    }

    setLoading(true);
    const userPref = await checkUsernameExists(trimmed);
    setLoading(false);

    setUsername(trimmed);

    if (userPref) {
      setPreferences({
        preferences: userPref.preferences,
        fabricPreferences: userPref.fabricPreferences,
        dealBreakers: userPref.dealBreakers,
      });
      router.push("/(dashboard)/shopping");
    } else {
      router.push("/(auth)/questionnaire");
    }
  };

  const isDisabled = usernameInput.trim().length === 0 || loading;

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
        value={usernameInput}
        onChangeText={setUsernameInput}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!loading}
      />
      {loading && <ActivityIndicator size="small" color="#2C6E49" style={{ marginBottom: 20 }} />}
      <Pressable
        onPress={handleNext}
        disabled={isDisabled}
        style={({ pressed }) => [
          styles.button,
          pressed && !isDisabled && styles.pressedButton,
          isDisabled && styles.disabledButton,
        ]}
      >
        <Text style={styles.buttonText}>{loading ? "Checking..." : "Next"}</Text>
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
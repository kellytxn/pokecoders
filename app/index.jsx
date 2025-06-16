import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

const Landing = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.jpg")} style={styles.logo} />

      <View style={styles.linkContainer}>
        <Pressable
          onPress={() => router.push("/home")}
          style={({ pressed }) => [styles.box, pressed && styles.pressedBox]}
          hitSlop={20}
        >
          <Text style={styles.linkText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EBE9E3",
  },
  logo: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 40,
  },
  linkContainer: {
    gap: 20,
    alignItems: "center",
  },
  box: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: "center",
    width: 200,
  },
  linkText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
});

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Reward = () => {
  const handleScanPress = () => {
    console.log("Scan QR pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleScanPress} style={styles.scanButton}>
          <Ionicons name="camera" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>Exchange points for rewards!</Text>
    </SafeAreaView>
  );
};

export default Reward;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBE9E3",
  },
  header: {
    width: "100%",
    alignItems: "flex-end",
    padding: 15,
  },
  scanButton: {
    padding: 8,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    textAlignVertical: "center",
  },
});

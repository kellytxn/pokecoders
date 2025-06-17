import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Reward = () => {
  const [userPoints, setUserPoints] = useState(1250);
  const [redeemedVouchers, setRedeemedVouchers] = useState([]);

  const handleScanPress = () => {
    console.log("Scan receipt pressed");
  };

  const handleRedeem = () => {
    if (userPoints >= 500) {
      setUserPoints((prev) => prev - 500);
      setRedeemedVouchers((prev) => [
        ...prev,
        { id: Date.now(), title: "$5 Gift Card" },
      ]);
      Alert.alert("Success", "You’ve redeemed a $5 Gift Card!");
    }
  };

  const canRedeem = userPoints >= 500;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rewards</Text>
        <TouchableOpacity onPress={handleScanPress} style={styles.scanButton}>
          <Ionicons name="camera" size={26} color="#2c3e50" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsLabel}>YOUR POINTS</Text>
          <Text style={styles.pointsValue}>{userPoints.toLocaleString()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Earn Points</Text>

          <View style={styles.ruleItem}>
            <MaterialIcons name="shopping-cart" size={20} color="#2c3e50" />
            <Text style={styles.ruleText}>
              Online purchases: Earn 1 point per $1 spent
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Ionicons name="receipt-outline" size={20} color="#2c3e50" />
            <Text style={styles.ruleText}>
              In-store: Scan receipt to claim points
            </Text>
          </View>

          <View style={styles.ruleItem}>
            <Ionicons name="leaf-outline" size={20} color="#2c3e50" />
            <Text style={styles.ruleText}>
              Sustainability bonus: 1.5× for items rated 4★+
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Rewards</Text>

          <View style={styles.rewardCard}>
            <Image
              source={{
                uri: "https://img.icons8.com/color/96/000000/gift-card.png",
              }}
              style={styles.rewardImage}
            />
            <View style={styles.rewardContent}>
              <Text style={styles.rewardTitle}>$5 Gift Card</Text>
              <Text style={styles.rewardPoints}>500 points</Text>
              <TouchableOpacity
                style={[
                  styles.redeemButton,
                  !canRedeem && styles.redeemButtonDisabled,
                ]}
                disabled={!canRedeem}
                onPress={handleRedeem}
              >
                <Text style={styles.redeemButtonText}>
                  {canRedeem ? "Redeem" : "Not Enough Points"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.comingSoon}>More rewards coming soon!</Text>
        </View>

        {redeemedVouchers.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Redeemed Vouchers</Text>
            {redeemedVouchers.map((voucher) => (
              <View key={voucher.id} style={styles.redeemedCard}>
                <Text style={styles.redeemedText}>{voucher.title}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Reward;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f6f2",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  scanButton: {
    backgroundColor: "#e0e0e0",
    padding: 8,
    borderRadius: 8,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  pointsContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 25,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  pointsLabel: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  pointsValue: {
    fontSize: 46,
    fontWeight: "bold",
    color: "#27ae60",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2c3e50",
  },
  ruleItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ruleText: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    color: "#444",
  },
  rewardCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
  },
  rewardImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  rewardContent: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rewardPoints: {
    fontSize: 15,
    color: "#27ae60",
    marginBottom: 10,
  },
  redeemButton: {
    backgroundColor: "#2c3e50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  redeemButtonDisabled: {
    backgroundColor: "#bbb",
  },
  redeemButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  comingSoon: {
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  redeemedCard: {
    backgroundColor: "#ecf0f1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  redeemedText: {
    fontSize: 16,
    color: "#2c3e50",
  },
});

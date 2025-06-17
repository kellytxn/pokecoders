import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Linking
} from "react-native";
import { computeSustainabilityScore } from "../../utils/scorer";
import { createStackNavigator } from "@react-navigation/stack";

const { width } = Dimensions.get("window");

const recommendedProducts = [
  {
    id: "1",
    name: "Cotton Shirt",
    price: "$24.99",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    fabricComposition: ["Organic Cotton", "Polyester"],
    ethicalCauses: ["Fair Labor"],
    dealBreakers: [],
    purchaseUrl: "https://shop.example.com",
  },
  {
    id: "2",
    name: "Jeans",
    price: "$39.99",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    fabricComposition: ["Conventional Cotton"],
    ethicalCauses: ["Recycled Materials"],
    dealBreakers: [],
    purchaseUrl: "https://shop.example.com",
  },
  {
    id: "3",
    name: "Leather Jacket",
    price: "$99.99",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    fabricComposition: ["Leather"],
    ethicalCauses: [],
    dealBreakers: ["Animal Products"],
    purchaseUrl: "https://shop.example.com",
  },
  {
    id: "4",
    name: "Polyester Tshirt",
    price: "$9.99",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    fabricComposition: ["Polyester"],
    ethicalCauses: [],
    dealBreakers: ["Synthetic Virgin Polyester"],
    purchaseUrl: "https://shop.example.com",
  },
  {
    id: "5",
    name: "Silk Blouse",
    price: "$49.99",
    image:
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    fabricComposition: ["Silk"],
    ethicalCauses: ["Women Empowerment"],
    dealBreakers: [],
    purchaseUrl: "https://shop.example.com",
  },
  {
    id: "6",
    name: "Wool Coat",
    price: "$149.99",
    image:
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    fabricComposition: ["Wool"],
    ethicalCauses: [],
    dealBreakers: ["Animal Products"],
    purchaseUrl: "https://shop.example.com",
  },
  {
    id: "7",
    name: "Denim shirt",
    price: "$34.99",
    image:
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    fabricComposition: ["Conventional Cotton", "Recycled Polyester"],
    ethicalCauses: ["Fair Labor", "Eco-Friendly Dye"],
    dealBreakers: [],
    purchaseUrl: "https://shop.example.com",
  },
];

function getScoreColor(score) {
  if (score <= 1.5) return "#e57373";   // soft red - poor
  if (score <= 3.0) return "#ffb74d";   // warm amber - moderate
  if (score <= 4.4) return "#81c784";   // fresh green - good
  return "#64b5f6";                     // light blue - excellent
}

// Shopping List Screen
const ShoppingList = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerText}>Recommended For You</Text>
      </SafeAreaView>

      <View style={styles.productsGrid}>
        {recommendedProducts.map((product) => {
          const sustainabilityScore = computeSustainabilityScore(product);

          return (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("ProductDetail", { product })}
            >
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />
              <View style={styles.productDetails}>
                <Text style={styles.productName} numberOfLines={1}>
                  {product.name}
                </Text>
                <View style={styles.priceRatingContainer}>
                  <Text style={styles.productPrice}>{product.price}</Text>
                  <View
                    style={[
                      styles.ratingContainer,
                      { backgroundColor: getScoreColor(sustainabilityScore) },
                    ]}
                  >
                    <Text style={styles.ratingText}>
                      🌿 {sustainabilityScore}/5
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

// Product Detail Screen
const ProductDetail = ({ route }) => {
  const { product } = route.params;
  const sustainabilityScore = computeSustainabilityScore(product);

  const handleBuyPress = () => {
    // This is a placeholder URL - replace with real purchase link if available
    Linking.openURL(product.purchaseUrl);
  };

  return (
    <ScrollView style={styles.detailContainer}>
      <Image source={{ uri: product.image }} style={styles.detailImage} />

      <View style={styles.detailContent}>
        <Text style={styles.detailName}>{product.name}</Text>
        <Text style={styles.detailPrice}>{product.price}</Text>

        <View style={styles.scoreContainer}>
          <Text style={styles.sectionTitle}>Sustainability Score</Text>
          <View
            style={[
              styles.scorePill,
              { backgroundColor: getScoreColor(sustainabilityScore) },
            ]}
          >
            <Text style={styles.scoreText}>{sustainabilityScore}/5</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Fabric Composition</Text>
          <View style={styles.tagsContainer}>
            {product.fabricComposition.map((fabric, index) => (
              <View key={index} style={styles.fabricTag}>
                <Text style={styles.tagText}>{fabric}</Text>
              </View>
            ))}
          </View>
        </View>

        {product.ethicalCauses.length > 0 && (
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Ethical Causes</Text>
            <View style={styles.tagsContainer}>
              {product.ethicalCauses.map((cause, index) => (
                <View key={index} style={styles.causeTag}>
                  <Text style={styles.tagText}>✓ {cause}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {product.dealBreakers.length > 0 && (
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Potential Concerns</Text>
            <View style={styles.tagsContainer}>
              {product.dealBreakers.map((concern, index) => (
                <View key={index} style={styles.concernTag}>
                  <Text style={styles.tagText}>⚠️ {concern}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.buyButton} onPress={handleBuyPress}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Stack = createStackNavigator();

const Shopping = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#EBE9E3",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#2d3436",
        headerTitleStyle: {
          fontWeight: "700",
        },
      }}
    >
      <Stack.Screen
        name="ShoppingList"
        component={ShoppingList}
        options={{ title: "Recommended" }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ title: "Product Details" }}
      />
    </Stack.Navigator>
  );
};

export default Shopping;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBE9E3",
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    marginLeft: 15,
    marginBottom: 15,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2d3436",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  productCard: {
    width: width * 0.45,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: "cover",
  },
  productDetails: {
    padding: 12,
  },
  productName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2d3436",
    marginBottom: 5,
  },
  priceRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e17055",
  },
  ratingContainer: {
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2d3436",
  },

  // Detail Screen styles

  detailContainer: {
    flex: 1,
    backgroundColor: "#EBE9E3",
  },
  detailImage: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
  },
  detailContent: {
    padding: 20,
  },
  detailName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2d3436",
    marginBottom: 5,
  },
  detailPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#e17055",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2d3436",
    marginBottom: 10,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  scorePill: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginLeft: 15,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  infoSection: {
    marginBottom: 25,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  fabricTag: {
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  causeTag: {
    backgroundColor: "#81c784",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  concernTag: {
    backgroundColor: "#ffb74d",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: "#2d3436",
  },
  buyButton: {
    backgroundColor: "#2d3436",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  buyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
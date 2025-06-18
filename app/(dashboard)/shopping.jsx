import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Alert,
  Linking,
} from "react-native";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios, { all } from "axios";
import { computeSustainabilityScore } from "../../utils/scorer";
import { UserContext } from "../../context/UserContext";
import { BACKEND_URL } from "../config";

const { width } = Dimensions.get("window");
const allProducts = require("../../context/products");

function getScoreColor(score) {
  if (score <= 1.5) return "#e57373"; // soft red - poor
  if (score <= 3.0) return "#ffb74d"; // warm amber - moderate
  if (score <= 4.4) return "#81c784"; // fresh green - good
  return "#64b5f6"; // light blue - excellent
}

// Shopping List Screen
const ShoppingList = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const userId = user?.id;
  const [products, setProducts] = useState(allProducts);
  const [viewTimers, setViewTimers] = useState({});

  const trackBehaviour = async (action, productId) => {
    if (!userId) return;

    try {
      const SCORE_WEIGHTS = {
        VIEW_3S: 1,
        CLICK: 2,
        VIEW_10S: 3,
        ADD_TO_CART: 5,
        PURCHASE: 10,
      };

      await axios.post(`${BACKEND_URL}/api/score/updateScore`, {
        userId: userId,
        productId: productId,
        scoreValue: SCORE_WEIGHTS[action],
      });

      if (userId) {
        const response = await axios.get(
          `${BACKEND_URL}/api/score/products/${userId}`
        );
      
        setProducts(response.data);
      } else setProducts(allProducts);
    } catch (error) {
      console.error("Error updating score:", error);
      Alert.alert("Error", "Failed to update scores");
    }
  };

  /*const sortedProducts = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/score/products/${userId}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Error", "Failed to load products");
      setProducts(allProducts);
    }
  };*/

  const handleProductPress = (product) => {
    trackBehaviour("CLICK", product.id);
    navigation.navigate("ProductDetail", { product });
  };

  const handleAddToCart = (productId) => {
    trackBehaviour("ADD_TO_CART", productId);
    Alert.alert("Added to Cart", "Item has been added to your cart");
  };

  /*useEffect(() => {
    sortedProducts();
  }, [userId]);*/

  useEffect(() => {
    const timers = {};

    products.forEach((product) => {
      timers[product.id] = {
        3: setTimeout(() => trackBehaviour("VIEW_3S", product.id), 3000),
        10: setTimeout(() => trackBehaviour("VIEW_10S", product.id), 10000),
      };
    });

    setViewTimers(timers);

    return () => {
      Object.values(timers).forEach((timerObj) => {
        clearTimeout(timerObj[3]);
        clearTimeout(timerObj[10]);
      });
    };
  }, [products]);

  useEffect(() => {
    return () => {
      Object.values(viewTimers).forEach((timerObj) => {
        clearTimeout(timerObj[3]);
        clearTimeout(timerObj[10]);
      });
    };
  }, [products]);

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerText}>Recommended For You</Text>
      </SafeAreaView>

      <View style={styles.productsGrid}>
        {products.map((product) => {
          const sustainabilityScore = computeSustainabilityScore(product);

          return (
            <View key={product.id} style={styles.productCard}>
              <TouchableOpacity
                onPress={() => handleProductPress(product)}
                activeOpacity={0.8}
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

              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(product.id)}
              >
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
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
  addToCartButton: {
    backgroundColor: "#e17055",
    padding: 8,
    alignItems: "center",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  addToCartText: {
    color: "white",
    fontWeight: "bold",
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

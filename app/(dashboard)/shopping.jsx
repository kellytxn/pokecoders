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
} from "react-native";
import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { computeSustainabilityScore } from "../../utils/scorer";
import { recommendedProducts } from "../../context/products";
import { UserContext } from "../../context/UserContext";

const { width } = Dimensions.get("window");
const BACKEND_URL = "http://192.168.10.141:3001";

function getScoreColor(score) {
  if (score <= 1.5) return "#e57373";   // soft red - poor
  if (score <= 3.0) return "#ffb74d";   // warm amber - moderate
  if (score <= 4.4) return "#81c784";   // fresh green - good
  return "#64b5f6";                     // light blue - excellent
}

const Shopping = () => {
  const { user } = useContext(UserContext);
  const userId = user?.id;
  const [products, setProducts] = useState(recommendedProducts);
  const [viewTimers, setViewTimers] = useState({});


  const trackBehaviour = async (action, productId) => {
    try {
      const SCORE_WEIGHTS = {
        VIEW_3S: 1,
        CLICK: 2,
        VIEW_10S: 3,
        ADD_TO_CART: 5,
        PURCHASE: 10
      };

      const response = await axios.post(`${BACKEND_URL}/api/score/updateScore`, {
        userId: userId,
        productId: productId,
        scoreValue: SCORE_WEIGHTS[action],
      });
    } catch (error) {
      console.error("Error updating score:", error);
      Alert.alert("Error", "Failed to update scores");
    }
  }

  const handleProductPress = (productId) => {
    trackBehaviour("CLICK", productId);

    // TO BE WRITTEN: PRODUCT DETAIL SCREEN AFTER CLICKING INTO PRODUCT
  }

  const handleAddToCart = (productId) => {
    trackBehaviour("ADD_TO_CART", productId);

    // TO BE WRITTEN: SCREEN AFTER CLICKING ADD TO CART
  }

  const sortedProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/score/products/${userId}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Error", "Failed to load products");
    }
  }

  useEffect(() => {
    sortedProducts();
  }, [userId]);
  
  useFocusEffect(
    React.useCallback(() => {
      sortedProducts();
    }, [userId])
  );

  useEffect(() => {
    const timers = {};
    
    products.forEach(product => {
      timers[product.id] = {
        3: setTimeout(() => trackBehaviour("VIEW_3S", product.id), 3000),
        10: setTimeout(() => trackBehaviour("VIEW_10S", product.id), 10000)
      };
    });
    
    setViewTimers(timers);
    
    return () => {
      Object.values(timers).forEach(timerObj => {
        clearTimeout(timerObj[3]);
        clearTimeout(timerObj[10]);
      });
    };
  }, [products]);

  useEffect(() => {
    return () => {
      Object.values(viewTimers).forEach(timerObj => {
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
                onPress={() => handleProductPress(product.id)}
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
    backgroundColor: '#e17055',
    padding: 8,
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  addToCartText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
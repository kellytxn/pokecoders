import {
  Alert,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useContext } from "react";

const { width } = Dimensions.get("window");
const BACKEND_URL = "http://192.168.10.141:3001";

const recommendedProducts = [
  {
    id: "1",
    name: "Cotton Shirt",
    price: "$24.99",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Jeans",
    price: "$39.99",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Corrected linen shorts
    rating: 4.8,
  },
  {
    id: "3",
    name: "Leather Jacket",
    price: "$99.99",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 1.4,
  },
  {
    id: "4",
    name: "Polyester Tshirt",
    price: "$9.99",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    rating: 1.1,
  },
  {
    id: "5",
    name: "Silk Blouse",
    price: "$49.99",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03",
    rating: 4.7,
  },
  {
    id: "6",
    name: "Wool Coat",
    price: "$149.99",
    image:
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 0.7,
  },
  {
    id: "7",
    name: "Denim shirt",
    price: "$34.99",
    image:
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
  },
];

const Shopping = () => {
  const trackBehaviour = async (action, productId) => {
    try {
      const SCORE_WEIGHTS = {
        VIEW_3S: 1,
        CLICK: 2,
        VIEW_10S: 3,
        ADD_TO_CART: 5,
        PURCHASE: 10
      };

      const response = await axios.post(`${BACKEND_URL}/updateScore`, {
        userId: ,
        productId: productId,
        scoreValue: SCORE_WEIGHTS[action]
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

  const ProductCard = ({ product }) => {
    const viewTimer = useRef(null);
    
    useEffect(() => {
      viewTimer.current = setTimeout(() => {
        trackBehaviour("VIEW_3S", product.id);
        
        viewTimer.current = setTimeout(() => {
          trackBehaviour("VIEW_10S", product.id);
        }, 7000);
      }, 3000);

      return () => {
        clearTimeout(viewTimer.current);
      };
    }, [product.id]);

    return (
      <TouchableOpacity
        key={product.id}
        style={styles.productCard}
        activeOpacity={0.8}
        onPress={() => handleProductPress(product.id)}
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
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>★ {product.rating}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={() => handleAddToCart(product.id)}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerText}>Recommended For You</Text>
      </SafeAreaView>

      <View style={styles.productsGrid}>
        {recommendedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
          ))}
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
    backgroundColor: "#fdcb6e",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "700",
    color: "white",
  },
  addToCartButton: {
    backgroundColor: "#e17055",
    borderRadius: 6,
    paddingVertical: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: "white",
    fontWeight: "600",
  },
  contentSection: {
    padding: 20,
    paddingTop: 0,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2d3436",
    marginBottom: 15,
  },
});

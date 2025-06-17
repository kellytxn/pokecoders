import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { computeSustainabilityScore } from "../../utils/scorer";

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
  },
];

function getScoreColor(score) {
  if (score <= 1.5) return "#e57373";   // soft red - poor
  if (score <= 3.0) return "#ffb74d";   // warm amber - moderate
  if (score <= 4.4) return "#81c784";   // fresh green - good
  return "#64b5f6";                     // light blue - excellent
}

const Shopping = () => {
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
});
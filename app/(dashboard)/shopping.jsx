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
    "id": "1",
    "name": "Monette Linen Dress",
    "price": "$285.00",
    "image": "https://media.thereformation.com/image/upload/f_auto,q_auto:eco,dpr_2.0/w_500/PRD-SFCC/1314891/BLACK/1314891.1.BLACK?_s=RAABAB0",
    "fabricComposition": ["Linen"],
    "ethicalCauses": ["Carbon Footprint",
                "Recycled Materials"],
    "dealBreakers": [],
    "purchaseUrl": "https://www.thereformation.com/products/monette-linen-dress/1314891BLK.html?dwvar_1314891BLK_color=BLK"
  },
  {
    "id": "2",
    "name": "Aubree Linen Dress",
    "price": "$145.00",
    "image": "https://media.thereformation.com/image/upload/f_auto,q_auto:eco,dpr_2.0/w_500/PRD-SFCC/1310229/STELLAR_CHECK/1310229.1.STELLAR_CHECK?_s=RAABAB0",
    "fabricComposition": ["Linen"],
    "ethicalCauses": ["Carbon Footprint",
                "Recycled Materials"],
    "dealBreakers": [],
    "purchaseUrl": "https://www.thereformation.com/products/aubree-linen-dress/1310229MTE.html?dwvar_1310229MTE_color=MTE"
  },
  {
    "id": "3",
    "name": "Reese Linen Top",
    "price": "$215.00",
    "image": "https://media.thereformation.com/image/upload/f_auto,q_auto:eco,dpr_2.0/w_500/PRD-SFCC/1317902/WHITE/1317902.1.WHITE?_s=RAABAB0",
    "fabricComposition": ["Linen"],
    "ethicalCauses": ["Carbon Footprint",
                "Recycled Materials"],
    "dealBreakers": [],
    "purchaseUrl": "https://www.thereformation.com/products/reese-linen-top/1317902WHT.html?dwvar_1317902WHT_color=WHT"
  },
  {
    "id": "4",
    "name": "Cary Low Rise Slouchy Wide Leg Jeans",
    "price": "$285.00",
    "image": "https://media.thereformation.com/image/upload/f_auto,q_auto:eco,dpr_2.0/w_500/PRD-SFCC/1313451/COLORADO_NO_WAISTBAND/1313451.3.COLORADO_NO_WAISTBAND?_s=RAABAB0",
    "fabricComposition": ["Recycled Cotton", "Lyocell"],
    "ethicalCauses": ["Carbon Footprint",
                "Recycled Materials"],
    "dealBreakers": [],
    "purchaseUrl": "https://www.thereformation.com/products/cary-low-rise-slouchy-wide-leg-jeans/1313451ONW.html?dwvar_1313451ONW_color=ONW"
  },
  {
    "id": "5",
    "name": "Rosemond Linen Dress",
    "price": "$185.00",
    "image": "https://media.thereformation.com/image/upload/f_auto,q_auto:eco,dpr_2.0/w_500/PRD-SFCC/1317255/REMY_CHECK/1317255.2.REMY_CHECK?_s=RAABAB0",
    "fabricComposition": ["Linen"],
    "ethicalCauses": ["Carbon Footprint",
                "Recycled Materials"],
    "dealBreakers": [],
    "purchaseUrl": "https://www.thereformation.com/products/rosemond-linen-dress/1317255RMK.html?dwvar_1317255RMK_color=RMK"
  },
  {
    "id": "6",
    "name": "Viola Linen Top",
    "price": "$245.00",
    "image": "https://media.thereformation.com/image/upload/f_auto,q_auto:eco,dpr_2.0/w_500/PRD-SFCC/1317270/SUGAR/1317270.1.SUGAR?_s=RAABAB0",
    "fabricComposition": ["Linen"],
    "ethicalCauses": ["Carbon Footprint",
                "Recycled Materials"],
    "dealBreakers": [],
    "purchaseUrl": "https://www.thereformation.com/products/viola-linen-top/1317270USG.html?dwvar_1317270USG_color=USG"
  },
  {
    "id": "7",
    "name": "Fernando Linen Wide Leg Pant",
    "price": "$270.00",
    "image": "https://media.thereformation.com/image/upload/f_auto,q_auto:eco,dpr_2.0/w_500/PRD-SFCC/1314641/OATMEAL/1314641.1.OATMEAL?_s=RAABAB0",
    "fabricComposition": ["Linen"],
    "ethicalCauses": ["Carbon Footprint",
                "Recycled Materials"],
    "dealBreakers": [],
    "purchaseUrl": "https://www.thereformation.com/products/fernando-linen-wide-leg-pant/1314641OAT.html?dwvar_1314641OAT_color=OAT"
  },
  {
    "id": "8",
    "name": "Overland Silk Top",
    "price": "$185.00",
    "image": "https://media.thereformation.com/image/upload/f_auto,q_auto:eco,dpr_2.0/PRD-SFCC/1311868/LYCHEE/1311868.1.LYCHEE?_s=RAABAB0",
    "fabricComposition": ["Silk"],
    "ethicalCauses": ["Carbon Footprint",
                "Recycled Materials"],
    "dealBreakers": [],
    "purchaseUrl": "https://www.thereformation.com/products/overland-silk-top/1311868LYE.html?dwvar_1311868LYE_color=LYE"
  },
  {
    "id": "9",
    "name": "Malika Linen Top",
    "price": "$215.00",
    "image": "https://media.thereformation.com/image/upload/f_auto,q_auto:eco,dpr_2.0/w_500/PRD-SFCC/1314836/CHOCOLATE_CAKE/1314836.1.CHOCOLATE_CAKE?_s=RAABAB0",
    "fabricComposition": ["Linen"],
    "ethicalCauses": ["Carbon Footprint",
                "Recycled Materials"],
    "dealBreakers": [],
    "purchaseUrl": "https://www.thereformation.com/products/malika-linen-top/1314836CTK.html?dwvar_1314836CTK_color=CTK"
  },
  {
    "id": "10",
    "name": "Jonelle Silk Dress",
    "price": "$400.00",
    "image": "https://media.thereformation.com/image/upload/f_auto,q_auto:eco,dpr_2.0/w_500/PRD-SFCC/1318312/SUMMER_DAY/1318312.1.SUMMER_DAY?_s=RAABAB0",
    "fabricComposition": ["Silk"],
    "ethicalCauses": ["Carbon Footprint",
                "Recycled Materials"],
    "dealBreakers": [],
    "purchaseUrl": "https://www.thereformation.com/products/jonelle-silk-dress/1318312SUA.html?dwvar_1318312SUA_color=SUA"
  },
  {
    "id": "11",
    "name": "Spritz Silk Top",
    "price": "$185.00",
    "image": "https://media.thereformation.com/image/upload/f_auto,q_auto:eco,dpr_2.0/w_500/PRD-SFCC/1310100/SUMMER_DAY/1310100.1.SUMMER_DAY?_s=RAABAB0",
    "fabricComposition": ["Silk"],
    "ethicalCauses": ["Carbon Footprint",
                "Recycled Materials"],
    "dealBreakers": [],
    "purchaseUrl": "https://www.thereformation.com/products/spritz-silk-top/1310100SUA.html?dwvar_1310100SUA_color=SUA"
  },
  {
    "id": "12",
    "name": "Dale Dress",
    "price": "$215.00",
    "image": "https://media.thereformation.com/image/upload/f_auto,q_auto:eco,dpr_2.0/w_500/PRD-SFCC/1317608/CHEESECAKE/1317608.2.CHEESECAKE?_s=RAABAB0",
    "fabricComposition": ["Viscose"],
    "ethicalCauses": ["Carbon Footprint",
                "Recycled Materials"],
    "dealBreakers": [],
    "purchaseUrl": "https://www.thereformation.com/products/dale-dress/1317608HEE.html?dwvar_1317608HEE_color=HEE"
  },
  {
    "id": "13",
    "name": "Max Slim Tee",
    "price": "$69.00",
    "image": "https://media.thereformation.com/image/upload/f_auto,q_auto:eco,dpr_2.0/w_500/PRD-SFCC/1316453/WHITE/1316453.2.WHITE?_s=RAABAB0",
    "fabricComposition": ["Recycled Cotton", "Lyocell"],
    "ethicalCauses": ["Carbon Footprint",
                "Recycled Materials"],
    "dealBreakers": [],
    "purchaseUrl": "https://www.thereformation.com/products/max-slim-tee/1316453WHT.html?dwvar_1316453WHT_color=WHT"
  },
  {
    "id": "14",
    "name": "Rowan Crew Tee",
    "price": "$69.00",
    "image": "https://media.thereformation.com/image/upload/f_auto,q_auto:eco,dpr_2.0/w_500/PRD-SFCC/1316467/WHITE/1316467.1.WHITE?_s=RAABAB0",
    "fabricComposition": ["Organic Cotton"],
    "ethicalCauses": ["Carbon Footprint",
                "Recycled Materials"],
    "dealBreakers": [],
    "purchaseUrl": "https://www.thereformation.com/products/rowan-crew-tee/1316467WHT.html?dwvar_1316467WHT_color=WHT"
  },
  {
    "id": "15",
    "name": "Hattie Top",
    "price": "$215.00",
    "image": "https://media.thereformation.com/image/upload/f_auto,q_auto:eco,dpr_2.0/w_500/PRD-SFCC/1318520/WHITE_EYELET/1318520.1.WHITE_EYELET?_s=RAABAB0",
    "fabricComposition": ["Polyester"],
    "ethicalCauses": ["Carbon Footprint",
                "Recycled Materials"],
    "dealBreakers": [],
    "purchaseUrl": "https://www.thereformation.com/products/hattie-top/1318520WYT.html?dwvar_1318520WYT_color=WYT"
  },
  {
    "id": "16",
    "name": "Dusk Knit Top",
    "price": "$84.00",
    "image": "https://media.thereformation.com/image/upload/f_auto,q_auto:eco,dpr_2.0/w_500/PRD-SFCC/1312627/FIOR_DI_LATTE/1312627.2.FIOR_DI_LATTE?_s=RAABAB0",
    "fabricComposition": ["Recycled Cotton", "Spandex"],
    "ethicalCauses": ["Carbon Footprint",
                "Recycled Materials"],
    "dealBreakers": [],
    "purchaseUrl": "https://www.thereformation.com/products/dusk-knit-top/1312627FDL.html?dwvar_1312627FDL_color=FDL"
  }
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
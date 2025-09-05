import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

const FoodItemCard = ({ result }) => {
  const getHealthScoreColor = (score) => {
    if (score >= 80) return { color: "#059669", bgColor: "#ECFDF5" };
    if (score >= 60) return { color: "#2563EB", bgColor: "#EFF6FF" };
    if (score >= 40) return { color: "#D97706", bgColor: "#FFFBEB" };
    if (score >= 20) return { color: "#EA580C", bgColor: "#FFF7ED" };
    return { color: "#DC2626", bgColor: "#FEF2F2" };
  };

  const getHealthScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Bon";
    if (score >= 40) return "Correct";
    if (score >= 20) return "Moyen";
    return "Pauvre";
  };

  const getHealthBarColor = (score) => {
    if (score >= 80) return "#059669";
    if (score >= 60) return "#2563EB";
    if (score >= 40) return "#D97706";
    if (score >= 20) return "#EA580C";
    return "#DC2626";
  };

  const healthColors = getHealthScoreColor(result.health_score || 0);

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#ECFDF5", "#EFF6FF"]} style={styles.gradient}>
        {/* Header avec nom et scores */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.foodName}>{result.class_name}</Text>
            <View style={styles.scoresContainer}>
              {result.confidence > 0 && (
                <View style={styles.confidenceContainer}>
                  <Text style={styles.confidenceText}>
                    {(result.confidence * 100).toFixed(0)}%
                  </Text>
                </View>
              )}

              {result.health_score !== undefined && (
                <View
                  style={[
                    styles.healthScoreContainer,
                    { backgroundColor: healthColors.bgColor },
                  ]}
                >
                  <Ionicons name="heart" size={12} color={healthColors.color} />
                  <Text
                    style={[
                      styles.healthScoreText,
                      { color: healthColors.color },
                    ]}
                  >
                    {result.health_score}/100
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Score de santé détaillé */}
        {result.health_score !== undefined && (
          <View style={styles.healthSection}>
            <View style={styles.healthLabelContainer}>
              <Text style={styles.healthLabel}>Qualité nutritionnelle:</Text>
              <Text style={[styles.healthValue, { color: healthColors.color }]}>
                {getHealthScoreLabel(result.health_score)}
              </Text>
            </View>

            <View style={styles.healthBarContainer}>
              <View style={styles.healthBarBackground}>
                <View
                  style={[
                    styles.healthBarFill,
                    {
                      width: `${result.health_score}%`,
                      backgroundColor: getHealthBarColor(result.health_score),
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        )}

        {/* Portion */}
        {result.portion && (
          <View style={styles.portionContainer}>
            <Text style={styles.portionText}>
              <Text style={styles.portionLabel}>Portion: </Text>
              {result.portion.grams}g ({(result.portion.ratio * 100).toFixed(0)}
              %)
            </Text>
          </View>
        )}

        {/* Nutrition */}
        {result.nutrition && (
          <View style={styles.nutritionContainer}>
            <Text style={styles.nutritionTitle}>
              Nutrition pour cette portion:
            </Text>

            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionRow}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>Calories:</Text>
                  <Text style={styles.nutritionValue}>
                    {result.nutrition.calories} kcal
                  </Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>Protéines:</Text>
                  <Text style={styles.nutritionValue}>
                    {result.nutrition.proteins}g
                  </Text>
                </View>
              </View>

              <View style={styles.nutritionRow}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>Glucides:</Text>
                  <Text style={styles.nutritionValue}>
                    {result.nutrition.carbohydrates}g
                  </Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>Lipides:</Text>
                  <Text style={styles.nutritionValue}>
                    {result.nutrition.fat}g
                  </Text>
                </View>
              </View>

              {result.nutrition.fiber !== undefined && (
                <View style={styles.nutritionRow}>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Fibres:</Text>
                    <Text style={styles.nutritionValue}>
                      {result.nutrition.fiber}g
                    </Text>
                  </View>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Sucre:</Text>
                    <Text style={styles.nutritionValue}>
                      {result.nutrition.sugar}g
                    </Text>
                  </View>
                </View>
              )}

              {result.nutrition.sodium !== undefined && (
                <View style={styles.nutritionRow}>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Sodium:</Text>
                    <Text style={styles.nutritionValue}>
                      {result.nutrition.sodium}mg
                    </Text>
                  </View>
                  <View style={styles.nutritionItem} />
                </View>
              )}
            </View>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },
  header: {
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  foodName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    textTransform: "capitalize",
    flex: 1,
    marginRight: 12,
  },
  scoresContainer: {
    flexDirection: "row",
    gap: 8,
  },
  confidenceContainer: {
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#059669",
  },
  healthScoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  healthScoreText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  healthSection: {
    marginBottom: 16,
  },
  healthLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  healthLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  healthValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  healthBarContainer: {
    width: "100%",
  },
  healthBarBackground: {
    width: "100%",
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  healthBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  portionContainer: {
    marginBottom: 16,
  },
  portionText: {
    fontSize: 14,
    color: "#4B5563",
  },
  portionLabel: {
    fontWeight: "600",
  },
  nutritionContainer: {
    marginTop: 8,
  },
  nutritionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  nutritionGrid: {
    gap: 8,
  },
  nutritionRow: {
    flexDirection: "row",
    gap: 12,
  },
  nutritionItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nutritionLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  nutritionValue: {
    fontSize: 12,
    color: "#1F2937",
    fontWeight: "600",
  },
});

export default FoodItemCard;

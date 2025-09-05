import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const NutritionCard = ({ nutritionTotal }) => {
  if (!nutritionTotal) return null;

  const nutritionItems = [
    {
      label: "Calories",
      value: Math.round(nutritionTotal.calories),
      unit: "",
      color: "#DC2626",
      bgColor: "#FEF2F2",
    },
    {
      label: "Protéines",
      value: nutritionTotal.proteins.toFixed(1),
      unit: "g",
      color: "#2563EB",
      bgColor: "#EFF6FF",
    },
    {
      label: "Glucides",
      value: nutritionTotal.carbohydrates.toFixed(1),
      unit: "g",
      color: "#D97706",
      bgColor: "#FFFBEB",
    },
    {
      label: "Lipides",
      value: nutritionTotal.fat.toFixed(1),
      unit: "g",
      color: "#059669",
      bgColor: "#ECFDF5",
    },
    {
      label: "Fibres",
      value: nutritionTotal.fiber.toFixed(1),
      unit: "g",
      color: "#10B981",
      bgColor: "#F0FDF4",
    },
    {
      label: "Sucre",
      value: nutritionTotal.sugar.toFixed(1),
      unit: "g",
      color: "#EC4899",
      bgColor: "#FDF2F8",
    },
    {
      label: "Sodium",
      value: nutritionTotal.sodium.toFixed(0),
      unit: "mg",
      color: "#8B5CF6",
      bgColor: "#F5F3FF",
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#F3E8FF", "#FCE7F3"]} style={styles.header}>
        <Text style={styles.title}>Nutrition Totale Complète</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.grid}>
          {nutritionItems.map((item, index) => (
            <View
              key={index}
              style={[styles.nutritionItem, { backgroundColor: item.bgColor }]}
            >
              <Text style={[styles.value, { color: item.color }]}>
                {item.value}
                {item.unit}
              </Text>
              <Text style={styles.label}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  content: {
    padding: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  nutritionItem: {
    width: (width - 64) / 2 - 6, // 2 colonnes avec gaps
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
});

export default NutritionCard;

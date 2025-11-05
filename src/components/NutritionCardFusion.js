import { Ionicons } from "@expo/vector-icons";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const NutritionCardFusion = ({ nutritionTotal, items }) => {
  if (!nutritionTotal) return null;

  // Calculer le score santé moyen si des items sont fournis
  const calculateAverageHealthScore = () => {
    if (!items || items.length === 0) return null;
    const totalScore = items.reduce(
      (sum, item) => sum + (item?.health_score ?? 0),
      0
    );
    return Math.round(totalScore / items.length);
  };

  const avgHealthScore = calculateAverageHealthScore();

  const getHealthScoreColor = (score) => {
    if (!score) return { color: "#6B7280", bgColor: "#F3F4F6" };
    if (score >= 80) return { color: "#059669", bgColor: "#ECFDF5" };
    if (score >= 60) return { color: "#2563EB", bgColor: "#EFF6FF" };
    if (score >= 40) return { color: "#D97706", bgColor: "#FFFBEB" };
    if (score >= 20) return { color: "#EA580C", bgColor: "#FFF7ED" };
    return { color: "#DC2626", bgColor: "#FEF2F2" };
  };

  const getHealthScoreLabel = (score) => {
    if (!score) return "N/A";
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Bon";
    if (score >= 40) return "Moyen";
    if (score >= 20) return "Passable";
    return "Pauvre";
  };

  const healthColors = getHealthScoreColor(avgHealthScore);

  // Informations nutritionnelles avec petites cartes colorées
  const nutritionItems = [
    {
      label: "Calories",
      value: Math.round(nutritionTotal?.calories ?? 0),
      unit: "",
      color: "#DC2626",
      bgColor: "#FEF2F2",
    },
    {
      label: "Protéines",
      value: (nutritionTotal?.proteins ?? 0).toFixed(1),
      unit: "g",
      color: "#2563EB",
      bgColor: "#EFF6FF",
    },
    {
      label: "Glucides",
      value: (nutritionTotal?.carbohydrates ?? 0).toFixed(1),
      unit: "g",
      color: "#D97706",
      bgColor: "#FFFBEB",
    },
    {
      label: "Lipides",
      value: (nutritionTotal?.fat ?? 0).toFixed(1),
      unit: "g",
      color: "#059669",
      bgColor: "#ECFDF5",
    },
    {
      label: "Fibres",
      value: (nutritionTotal?.fiber ?? 0).toFixed(1),
      unit: "g",
      color: "#10B981",
      bgColor: "#F0FDF4",
    },
    {
      label: "Sucre",
      value: (nutritionTotal?.sugar ?? 0).toFixed(1),
      unit: "g",
      color: "#EC4899",
      bgColor: "#FDF2F8",
    },
    {
      label: "Sodium",
      value: (nutritionTotal?.sodium ?? 0).toFixed(0),
      unit: "mg",
      color: "#8B5CF6",
      bgColor: "#F5F3FF",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Nutrition Totale</Text>
        {avgHealthScore !== null && (
          <View
            style={[
              styles.healthScoreBadge,
              { backgroundColor: healthColors.bgColor },
            ]}
          >
            <Ionicons name="heart" size={14} color={healthColors.color} />
            <Text
              style={[styles.healthScoreText, { color: healthColors.color }]}
            >
              {avgHealthScore}/100
            </Text>
          </View>
        )}
      </View>

      {/* Score de santé avec barre */}
      {avgHealthScore !== null && (
        <View style={styles.healthSection}>
          <View style={styles.healthLabelContainer}>
            <Text style={styles.healthLabel}>Qualité nutritionnelle:</Text>
            <Text style={[styles.healthValue, { color: healthColors.color }]}>
              {getHealthScoreLabel(avgHealthScore)}
            </Text>
          </View>
          <View style={styles.healthBarBackground}>
            <View
              style={[
                styles.healthBarFill,
                {
                  width: `${avgHealthScore}%`,
                  backgroundColor: healthColors.color,
                },
              ]}
            />
          </View>
        </View>
      )}

      {/* Grille de nutrition - 2 colonnes compactes */}
      <View style={styles.nutritionSection}>
        <Text style={styles.sectionTitle}>
          Valeurs nutritionnelles totales:
        </Text>
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
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  healthScoreBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  healthScoreText: {
    fontSize: 13,
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
  nutritionSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row", // ✅ Layout horizontal
    flexWrap: "wrap", // ✅ Wrap sur plusieurs lignes
    justifyContent: "space-between", // ✅ Espace entre les colonnes
  },
  nutritionItem: {
    width: "48%", // ✅ 48% au lieu du calcul complexe
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8, // ✅ Espace entre les lignes
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "center",
  },
});

export default NutritionCardFusion;

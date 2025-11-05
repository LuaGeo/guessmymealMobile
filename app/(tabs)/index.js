import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import FoodItemCard from "../../src/components/FooditemCard";
import NutritionCardFusion from "../../src/components/NutritionCardFusion";
import { analyzeFood } from "../../src/services/api";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectionResults, setDetectionResults] = useState([]);
  const [nutritionTotal, setNutritionTotal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestPermissions = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission requise",
          "Nous avons besoin d'accéder à vos photos pour analyser vos repas."
        );
        return false;
      }
    }
    return true;
  };

  const pickImage = useCallback(async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0]);
        setDetectionResults([]);
        setNutritionTotal(null);
        setError(null);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Erreur", "Impossible de sélectionner l'image");
    }
  }, []);

  const takePhoto = useCallback(async () => {
    try {
      // Demander les permissions caméra spécifiquement
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission caméra requise",
          "Allez dans Réglages > Expo Go > Appareil photo et activez l'accès.",
          [
            { text: "Annuler" },
            { text: "Ouvrir Réglages", onPress: () => Linking.openSettings() },
          ]
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0]);
        setDetectionResults([]);
        setNutritionTotal(null);
        setError(null);
      }
    } catch (error) {
      console.error("Erreur caméra:", error);
      Alert.alert(
        "Erreur",
        `Impossible d'accéder à la caméra: ${error.message}`
      );
    }
  }, []);

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await analyzeFood(selectedImage);

      if (result.success) {
        const transformedResults = result.items.map((item) => ({
          class_name: item.label,
          confidence: item.confidence || 0,
          nutrition: {
            calories: Math.round(item.nutrition_estimated.calories),
            proteins: parseFloat(item.nutrition_estimated.proteins.toFixed(1)),
            carbohydrates: parseFloat(
              item.nutrition_estimated.carbohydrates.toFixed(1)
            ),
            fat: parseFloat(item.nutrition_estimated.fat.toFixed(1)),
            fiber: parseFloat(item.nutrition_estimated.fiber.toFixed(1)),
            sugar: parseFloat(item.nutrition_estimated.sugar.toFixed(1)),
            sodium: parseFloat(item.nutrition_estimated.sodium.toFixed(1)),
          },
          portion: item.portion,
          health_score: item.health_score,
        }));

        setDetectionResults(transformedResults);
        setNutritionTotal(result.nutrition_total);
      } else {
        setError("Échec de l'analyse");
      }
    } catch (err) {
      console.error("Detection error:", err);
      setError("Une erreur s'est produite lors de l'analyse");
    } finally {
      setIsLoading(false);
    }
  };

  const resetApp = () => {
    setSelectedImage(null);
    setDetectionResults([]);
    setNutritionTotal(null);
    setError(null);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#FFF7ED", "#FEF2F2"]} style={styles.gradient}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <LinearGradient
              colors={["#F97316", "#DC2626"]}
              style={styles.iconContainer}
            >
              <Ionicons name="camera" size={32} color="white" />
            </LinearGradient>
            <View style={styles.headerText}>
              <Text style={styles.title}>GuessMyMeal</Text>
              <Text style={styles.subtitle}>
                Analyse nutritionnelle complète
              </Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {!selectedImage ? (
            <View style={styles.uploadSection}>
              <LinearGradient
                colors={["#FFFFFF", "#FFF7ED"]}
                style={styles.uploadContainer}
              >
                <Ionicons
                  name="cloud-upload-outline"
                  size={64}
                  color="#F97316"
                />
                <Text style={styles.uploadTitle}>Sélectionnez une image</Text>
                <Text style={styles.uploadSubtitle}>
                  Prenez une photo ou choisissez depuis votre galerie
                </Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={takePhoto}
                  >
                    <Ionicons name="camera" size={20} color="white" />
                    <Text style={styles.buttonText}>Prendre une photo</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={pickImage}
                  >
                    <Ionicons name="images" size={20} color="#F97316" />
                    <Text style={styles.secondaryButtonText}>Galerie</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          ) : (
            <View style={styles.analysisSection}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: selectedImage.uri }}
                  style={styles.selectedImage}
                />
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[
                    styles.primaryButton,
                    isLoading && styles.disabledButton,
                  ]}
                  onPress={analyzeImage}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <ActivityIndicator size="small" color="white" />
                      <Text style={styles.buttonText}>Analyse en cours...</Text>
                    </>
                  ) : (
                    <>
                      <Ionicons name="analytics" size={20} color="white" />
                      <Text style={styles.buttonText}>
                        Analyser la nutrition
                      </Text>
                    </>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={resetApp}
                >
                  <Ionicons name="refresh" size={20} color="#F97316" />
                  <Text style={styles.secondaryButtonText}>Nouvelle image</Text>
                </TouchableOpacity>
              </View>

              {error && (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert-circle" size={20} color="#DC2626" />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              {nutritionTotal && (
                <NutritionCardFusion
                  nutritionTotal={nutritionTotal}
                  items={detectionResults}
                />
              )}

              {detectionResults.length > 0 && (
                <View style={styles.resultsContainer}>
                  <Text style={styles.resultsTitle}>Aliments Détectés</Text>
                  {detectionResults.map((result, index) => (
                    <FoodItemCard key={index} result={result} />
                  ))}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  uploadSection: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 60,
  },
  uploadContainer: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#F97316",
    borderStyle: "dashed",
    padding: 40,
    alignItems: "center",
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 16,
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  analysisSection: {
    paddingVertical: 20,
  },
  imageContainer: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  selectedImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  primaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F97316",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#F97316",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: "#F97316",
    fontSize: 16,
    fontWeight: "600",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    gap: 8,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 14,
    flex: 1,
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
});

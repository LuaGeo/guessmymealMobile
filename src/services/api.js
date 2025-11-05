// Configuration de l'API
// IMPORTANT: Remplacez par l'IP de votre serveur (pas localhost si vous testez sur un appareil)
const API_BASE_URL = "http://localhost:8000"; // Exemple - remplacez par votre IP

/**
 * Analyse une image de nourriture via l'API FastAPI
 * @param {Object} imageAsset - L'asset image d'Expo ImagePicker
 * @param {number|null} totalWeightG - Poids total optionnel en grammes
 * @returns {Promise<Object>} - Résultat de l'analyse
 */
export const analyzeFood = async (imageAsset, totalWeightG = null) => {
  try {
    console.log("🚀 Début de l'analyse...");
    console.log("📷 Image URI:", imageAsset.uri);
    console.log("🌐 API URL:", `${API_BASE_URL}/api/predict-llm`);

    // Créer le FormData
    const formData = new FormData();

    // Ajouter l'image avec le bon format
    formData.append("file", {
      uri: imageAsset.uri,
      type: "image/jpeg",
      name: "food_image.jpg",
    });

    // Ajouter le poids total si fourni
    if (totalWeightG !== null) {
      formData.append("total_weight_g", totalWeightG.toString());
    }

    console.log("📝 FormData préparé");

    // Faire l'appel API
    const response = await fetch(`${API_BASE_URL}/api/predict-llm`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("📡 Réponse API status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("✅ API Response reçue:", result);

    return result;
  } catch (error) {
    console.error("💥 Erreur dans analyzeFood:", error);
    throw error;
  }
};

/**
 * Vérifie la santé de l'API
 * @returns {Promise<Object>} - Statut de l'API
 */
export const checkApiHealth = async () => {
  try {
    console.log("🏥 Test de santé API...");
    const response = await fetch(`${API_BASE_URL}/api/health-openai`);

    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ API Health:", result);
    return result;
  } catch (error) {
    console.error("❌ Erreur health check:", error);
    throw error;
  }
};

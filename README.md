# GuessMyMeal Mobile

Application mobile React Native pour la reconnaissance alimentaire et l'analyse nutritionnelle complète.

## 🍽️ Fonctionnalités

- **Reconnaissance alimentaire**: Détection automatique des aliments via intelligence artificielle
- **Analyse nutritionnelle complète**:
  - Macronutriments (calories, protéines, glucides, lipides)
  - Micronutriments (fibres, sucre, sodium)
  - Score de santé pour chaque aliment
- **Prise de photo**: Caméra intégrée ou sélection depuis la galerie
- **Interface intuitive**: Design moderne avec dégradés et animations
- **Calcul des portions**: Estimation automatique des quantités

## 🚀 Installation

### Prérequis

- Node.js (version 18+)
- Expo CLI
- Un appareil mobile ou émulateur
- API FastAPI en cours d'exécution

### Étapes d'installation

1. **Cloner le projet**

```bash
git clone <repository-url>
cd guessmymealMobile
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer l'API**

   - Modifiez l'URL de l'API dans `src/services/api.js`
   - Remplacez `http://localhost:8000` par l'URL de votre serveur FastAPI

4. **Démarrer l'application**

```bash
npm start
```

5. **Lancer sur votre appareil**
   - Scannez le QR code avec l'app Expo Go
   - Ou utilisez `npm run android` / `npm run ios`

## 📱 Utilisation

1. **Sélectionner une image**

   - Appuyez sur "Prendre une photo" pour utiliser l'appareil photo
   - Ou "Galerie" pour choisir une image existante

2. **Analyser l'image**

   - Appuyez sur "Analyser la nutrition"
   - Attendez le traitement (quelques secondes)

3. **Consulter les résultats**
   - **Nutrition totale**: Vue d'ensemble des valeurs nutritionnelles
   - **Détails par aliment**: Information détaillée pour chaque aliment détecté
   - **Score de santé**: Évaluation de la qualité nutritionnelle

## 🏗️ Architecture

```
src/
├── components/
│   ├── NutritionCard.js      # Affichage nutrition totale
│   └── FoodItemCard.js       # Carte détaillée par aliment
├── screens/
│   └── FoodDetectionScreen.js # Écran principal
└── services/
    └── api.js                # Service d'appels API
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` (optionnel) pour configurer:

```env
API_BASE_URL=http://your-api-server.com:8000
```

### Permissions

L'application demande les permissions suivantes:

- **Appareil photo**: Pour prendre des photos
- **Galerie**: Pour accéder aux images existantes

## 📊 Format des données API

L'application attend une réponse API au format:

```json
{
  "success": true,
  "items": [
    {
      "label": "nom_aliment",
      "confidence": 0.95,
      "portion": {
        "ratio": 0.4,
        "grams": 120
      },
      "nutrition_estimated": {
        "calories": 250,
        "proteins": 15.5,
        "carbohydrates": 30.2,
        "fat": 8.1,
        "fiber": 5.2,
        "sugar": 12.3,
        "sodium": 450
      },
      "health_score": 75
    }
  ],
  "nutrition_total": {
    "calories": 500,
    "proteins": 25.0,
    "carbohydrates": 60.0,
    "fat": 15.0,
    "fiber": 8.0,
    "sugar": 20.0,
    "sodium": 800
  }
}
```

## 🎨 Personnalisation

### Couleurs

Les couleurs principales peuvent être modifiées dans les styles:

- **Primary**: `#F97316` (Orange)
- **Secondary**: `#DC2626` (Rouge)
- **Background**: Dégradé `#FFF7ED` vers `#FEF2F2`

### Scores de santé

Les seuils de qualité nutritionnelle:

- **Excellent**: 80-100 (Vert)
- **Bon**: 60-79 (Bleu)
- **Correct**: 40-59 (Jaune)
- **Moyen**: 20-39 (Orange)
- **Pauvre**: 0-19 (Rouge)

## 🔍 Dépannage

### Problèmes courants

1. **Erreur de connexion API**

   - Vérifiez que votre serveur FastAPI est démarré
   - Confirmez l'URL dans `src/services/api.js`
   - Testez l'endpoint `/api/health-openai`

2. **Permissions refusées**

   - Autorisez l'accès à la caméra et à la galerie
   - Redémarrez l'application après avoir accordé les permissions

3. **Images ne se chargent pas**
   - Vérifiez la taille des images (max 10MB)
   - Formats supportés: JPG, JPEG, PNG

## 📈 Développement

### Ajouter de nouvelles fonctionnalités

1. **Nouveaux composants**: Ajoutez dans `src/components/`
2. **Nouvelles données nutritionnelles**: Modifiez les types dans les composants
3. **Personnalisation UI**: Éditez les styles dans chaque composant

### Tests

```bash
# Tester sur iOS
npm run ios

# Tester sur Android
npm run android

# Tester sur navigateur
npm run web
```

## 📄 Licence

Ce projet est sous licence MIT.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à:

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commit vos changements
4. Push vers la branche
5. Ouvrir une Pull Request

# 🍎 Food Compliance Checker

A web application that helps users check food product compliance, analyze ingredients, and identify potential allergens using barcode scanning or product search.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Frontend](#frontend)
- [Backend](#backend)
- [Health Score Calculations](#health-score-calculations)
- [How to Add More Additives](#how-to-add-more-additives)
- [Running the Application](#running-the-application)

---

## Overview

The Food Compliance Checker allows users to:
- 🔍 **Search products** by name
- 📱 **Scan barcodes** using their device camera
- ⚠️ **Check allergens** against personal allergies
- 📊 **View health scores** and nutritional information
- 🧪 **Analyze additives** with E-number explanations

---

## Frontend

The frontend is built with **React** (using Vite as the build tool) and provides a modern, responsive user interface.

### Tech Stack
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### Directory Structure

```
frontend/
├── src/
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global styles
│   ├── components/          # Reusable UI components
│   │   ├── AllergenInput/   # User allergen preferences input
│   │   ├── AllergyWarning/  # Displays allergen warnings
│   │   ├── BarcodeScanner/  # Camera-based barcode scanner
│   │   ├── HealthScore/     # Visual health score display
│   │   ├── Navbar/          # Navigation bar
│   │   ├── ProductCard/     # Product preview card
│   │   └── SearchBar/       # Search input component
│   ├── pages/               # Page components
│   │   ├── Home/            # Landing page with search
│   │   ├── SearchResults/   # Product search results
│   │   ├── ProductDetail/   # Full product details
│   │   ├── About/           # About page
│   │   ├── Contact/         # Contact page
│   │   ├── Help/            # Help/FAQ page
│   │   └── NotFound/        # 404 page
│   └── services/
│       └── api.js           # API service functions
└── vite.config.js           # Vite configuration
```

### Key Components

| Component | Description |
|-----------|-------------|
| `BarcodeScanner` | Uses device camera to scan product barcodes |
| `AllergenInput` | Lets users specify their allergens |
| `AllergyWarning` | Shows warnings when allergens are detected |
| `HealthScore` | Visual representation of product health score |
| `SearchBar` | Product search with autocomplete |
| `ProductCard` | Preview card showing product info |

### Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Landing page with search and barcode scanner |
| `/search` | SearchResults | Displays search results |
| `/product/:id` | ProductDetail | Detailed product information |
| `/about` | About | About the application |
| `/contact` | Contact | Contact information |
| `/help` | Help | FAQ and usage guide |

---

## Backend

The backend is built with **Express.js** and provides a REST API that integrates with the **Open Food Facts** database.

### Tech Stack
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Axios** - HTTP client for external API calls
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Directory Structure

```
backend/
├── server.js              # Main server entry point
├── routes/
│   └── productRoutes.js   # API route definitions
├── controllers/
│   └── productController.js  # Request handlers
├── services/
│   └── productService.js  # Business logic & API calls
└── utils/
    └── chemicalCodes.js   # Additive/E-number database
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/products/search?query=<name>&page=<num>` | Search products by name |
| `GET` | `/api/products/barcode/:code` | Get product by barcode |
| `GET` | `/api/products/:id` | Get product by ID |

### File Descriptions

#### `server.js`
Main Express server setup with:
- CORS configuration for frontend communication
- Middleware for JSON parsing and request logging
- Route mounting and error handling

#### `productRoutes.js`
Defines API endpoints and connects them to controller functions.

#### `productController.js`
Handles HTTP requests, validates input, and returns responses.

#### `productService.js`
Contains business logic including:
- Calls to Open Food Facts API
- Product data transformation
- Health score calculation

#### `chemicalCodes.js`
Database mapping E-numbers and additive codes to:
- Human-readable names
- Descriptions of each additive
- Risk levels (low/medium/high)

---

## Health Score Calculations

The health score is calculated in `productService.js` using the `calculateHealthScore()` function. The score ranges from **0 to 100**.

### Calculation Factors

#### 1. Base Score
- Starts at **50 points**

#### 2. Nutri-Score (if available)
| Grade | Score |
|-------|-------|
| A | 95 |
| B | 80 |
| C | 60 |
| D | 40 |
| E | 20 |

#### 3. NOVA Group Penalty (Processing Level)
| Group | Penalty |
|-------|---------|
| 1 (Unprocessed) | 0 |
| 2 (Processed ingredients) | -5 |
| 3 (Processed foods) | -10 |
| 4 (Ultra-processed) | -20 |

#### 4. Additives Penalty
- **-2 points** per additive (max -20 points)
- **Extra -5 points** for each high-risk additive:
  - E171 (Titanium Dioxide)
  - E250, E251, E252 (Nitrites/Nitrates)
  - E320, E321 (BHA/BHT)
  - E123 (Amaranth)
  - E952 (Cyclamate)

#### 5. Nutrient-Based Adjustments

| Nutrient | Condition | Impact |
|----------|-----------|--------|
| Sugar | >22.5g/100g | -10 |
| Sugar | >12.5g/100g | -5 |
| Saturated Fat | >5g/100g | -10 |
| Saturated Fat | >2.5g/100g | -5 |
| Sodium | >1.5g/100g | -10 |
| Sodium | >0.6g/100g | -5 |
| Fiber | >6g/100g | +10 |
| Fiber | >3g/100g | +5 |
| Protein | >8g/100g | +5 |

The final score is clamped between **0** and **100**.

---

## How to Add More Additives

To add new additives to the database, edit the file:

📂 **`backend/utils/chemicalCodes.js`**

### Step-by-Step Guide

#### 1. Open the File
Navigate to `backend/utils/chemicalCodes.js`

#### 2. Find the `chemicalCodes` Object
The additives are stored in the `chemicalCodes` object at the top of the file:

```javascript
const chemicalCodes = {
  // Colors (E100-E199)
  "e100": { name: "Curcumin", description: "Natural yellow color from turmeric", risk: "low" },
  // ... more entries
};
```

#### 3. Add Your New Additive
Add a new entry following this format:

```javascript
"e###": { 
  name: "Additive Name", 
  description: "Brief description of what it is/does", 
  risk: "low" | "medium" | "high" 
}
```

#### Example: Adding E903 (if missing)
```javascript
"e903": { 
  name: "Carnauba Wax", 
  description: "Natural plant wax coating from palm leaves", 
  risk: "low" 
}
```

### Risk Level Guidelines

| Risk Level | Description | Examples |
|------------|-------------|----------|
| `low` | Generally safe, natural, or beneficial | Vitamins, natural colors, common thickeners |
| `medium` | Some concerns or sensitivities | MSG, artificial sweeteners, synthetic dyes |
| `high` | Controversial, banned in some countries, or linked to health issues | Nitrites, BHA/BHT, certain dyes |

### Categories (E-Number Ranges)

| Range | Category |
|-------|----------|
| E100-E199 | Colors |
| E200-E299 | Preservatives |
| E300-E399 | Antioxidants & Acidity Regulators |
| E400-E499 | Thickeners, Stabilizers, Emulsifiers |
| E500-E599 | Acidity Regulators, Anti-caking Agents |
| E600-E699 | Flavor Enhancers |
| E900-E999 | Sweeteners, Glazing Agents, Gases |

### Notes
- Use lowercase for the key (e.g., `"e171"` not `"E171"`)
- Include variant codes if applicable (e.g., `"e150a"`, `"e150b"`)
- Brief, clear descriptions work best
- Research the risk level using reputable sources (EFSA, FDA)

---

## Running the Application

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
npm start
```
The backend runs on `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend runs on `http://localhost:5173`

### Environment Variables (Optional)
Create a `.env` file in the `backend` folder:
```
PORT=5000
NODE_ENV=development
```

---

## External APIs

The application uses the **Open Food Facts** API:
- Website: [openfoodfacts.org](https://world.openfoodfacts.org/)
- API Docs: [wiki.openfoodfacts.org/API](https://wiki.openfoodfacts.org/API)

---

## License

This project was created for educational purposes at RV College of Engineering.

/**
 * Chemical/Additive Code Mapping
 * Maps E-numbers and additive codes to human-readable names with explanations
 */

const chemicalCodes = {
  // Colors (E100-E199)
  "e100": { name: "Curcumin", description: "Natural yellow color from turmeric", risk: "low" },
  "e101": { name: "Riboflavin (Vitamin B2)", description: "Natural yellow color, also a vitamin", risk: "low" },
  "e102": { name: "Tartrazine", description: "Synthetic yellow dye, may cause allergic reactions", risk: "medium" },
  "e104": { name: "Quinoline Yellow", description: "Synthetic yellow-green dye", risk: "medium" },
  "e110": { name: "Sunset Yellow FCF", description: "Synthetic orange-yellow dye", risk: "medium" },
  "e120": { name: "Cochineal/Carmine", description: "Natural red dye from insects", risk: "low" },
  "e122": { name: "Azorubine/Carmoisine", description: "Synthetic red dye", risk: "medium" },
  "e123": { name: "Amaranth", description: "Synthetic red dye, banned in some countries", risk: "high" },
  "e124": { name: "Ponceau 4R", description: "Synthetic red dye", risk: "medium" },
  "e127": { name: "Erythrosine", description: "Synthetic pink-red dye", risk: "medium" },
  "e129": { name: "Allura Red AC", description: "Synthetic red dye", risk: "medium" },
  "e131": { name: "Patent Blue V", description: "Synthetic blue dye", risk: "medium" },
  "e132": { name: "Indigotine", description: "Synthetic blue dye", risk: "low" },
  "e133": { name: "Brilliant Blue FCF", description: "Synthetic blue dye", risk: "low" },
  "e140": { name: "Chlorophylls", description: "Natural green color from plants", risk: "low" },
  "e141": { name: "Copper Chlorophylls", description: "Modified natural green color", risk: "low" },
  "e150a": { name: "Plain Caramel", description: "Natural brown color from heated sugar", risk: "low" },
  "e150b": { name: "Caustic Sulphite Caramel", description: "Caramel color", risk: "low" },
  "e150c": { name: "Ammonia Caramel", description: "Caramel color used in beverages", risk: "low" },
  "e150d": { name: "Sulphite Ammonia Caramel", description: "Caramel color, most common type", risk: "low" },
  "e160a": { name: "Beta-Carotene", description: "Natural orange color, provitamin A", risk: "low" },
  "e160b": { name: "Annatto", description: "Natural orange-red color from seeds", risk: "low" },
  "e160c": { name: "Paprika Extract", description: "Natural red color from peppers", risk: "low" },
  "e171": { name: "Titanium Dioxide", description: "White pigment, controversial safety", risk: "high" },
  "e172": { name: "Iron Oxides", description: "Natural mineral colors (red, yellow, black)", risk: "low" },

  // Preservatives (E200-E299)
  "e200": { name: "Sorbic Acid", description: "Preservative against mold and yeast", risk: "low" },
  "e202": { name: "Potassium Sorbate", description: "Common food preservative", risk: "low" },
  "e210": { name: "Benzoic Acid", description: "Preservative, may trigger asthma", risk: "medium" },
  "e211": { name: "Sodium Benzoate", description: "Common preservative in acidic foods", risk: "medium" },
  "e220": { name: "Sulphur Dioxide", description: "Preservative, can trigger asthma", risk: "medium" },
  "e221": { name: "Sodium Sulphite", description: "Preservative and antioxidant", risk: "medium" },
  "e222": { name: "Sodium Hydrogen Sulphite", description: "Preservative", risk: "medium" },
  "e223": { name: "Sodium Metabisulphite", description: "Preservative and bleaching agent", risk: "medium" },
  "e224": { name: "Potassium Metabisulphite", description: "Preservative in wine and dried fruits", risk: "medium" },
  "e250": { name: "Sodium Nitrite", description: "Preservative in cured meats, controversial", risk: "high" },
  "e251": { name: "Sodium Nitrate", description: "Preservative in cured meats", risk: "high" },
  "e252": { name: "Potassium Nitrate", description: "Preservative (saltpeter)", risk: "high" },
  "e270": { name: "Lactic Acid", description: "Natural acid, safe preservative", risk: "low" },
  "e280": { name: "Propionic Acid", description: "Preservative against mold", risk: "low" },
  "e281": { name: "Sodium Propionate", description: "Bread preservative", risk: "low" },
  "e282": { name: "Calcium Propionate", description: "Common bread preservative", risk: "low" },

  // Antioxidants (E300-E399)
  "e300": { name: "Ascorbic Acid (Vitamin C)", description: "Natural antioxidant and vitamin", risk: "low" },
  "e301": { name: "Sodium Ascorbate", description: "Vitamin C salt, antioxidant", risk: "low" },
  "e302": { name: "Calcium Ascorbate", description: "Vitamin C salt, antioxidant", risk: "low" },
  "e304": { name: "Ascorbyl Palmitate", description: "Fat-soluble vitamin C, antioxidant", risk: "low" },
  "e306": { name: "Tocopherols (Vitamin E)", description: "Natural antioxidant", risk: "low" },
  "e307": { name: "Alpha-Tocopherol", description: "Vitamin E, antioxidant", risk: "low" },
  "e310": { name: "Propyl Gallate", description: "Synthetic antioxidant", risk: "medium" },
  "e320": { name: "BHA (Butylated Hydroxyanisole)", description: "Synthetic antioxidant, controversial", risk: "high" },
  "e321": { name: "BHT (Butylated Hydroxytoluene)", description: "Synthetic antioxidant, controversial", risk: "high" },
  "e322": { name: "Lecithins", description: "Emulsifier from soy or egg, natural", risk: "low" },
  "e325": { name: "Sodium Lactate", description: "Natural salt of lactic acid", risk: "low" },
  "e330": { name: "Citric Acid", description: "Natural acid from citrus fruits", risk: "low" },
  "e331": { name: "Sodium Citrates", description: "Acidity regulator", risk: "low" },
  "e332": { name: "Potassium Citrates", description: "Acidity regulator", risk: "low" },
  "e333": { name: "Calcium Citrates", description: "Acidity regulator and calcium source", risk: "low" },
  "e334": { name: "Tartaric Acid", description: "Natural acid from grapes", risk: "low" },
  "e338": { name: "Phosphoric Acid", description: "Acidity regulator in cola drinks", risk: "medium" },
  "e339": { name: "Sodium Phosphates", description: "Acidity regulator and emulsifier", risk: "low" },
  "e340": { name: "Potassium Phosphates", description: "Acidity regulator", risk: "low" },
  "e341": { name: "Calcium Phosphates", description: "Acidity regulator and calcium source", risk: "low" },

  // Emulsifiers, Stabilizers, Thickeners (E400-E499)
  "e400": { name: "Alginic Acid", description: "Natural thickener from seaweed", risk: "low" },
  "e401": { name: "Sodium Alginate", description: "Thickener and stabilizer from seaweed", risk: "low" },
  "e406": { name: "Agar", description: "Natural gelling agent from seaweed", risk: "low" },
  "e407": { name: "Carrageenan", description: "Thickener from seaweed, some controversy", risk: "medium" },
  "e410": { name: "Locust Bean Gum", description: "Natural thickener from carob seeds", risk: "low" },
  "e412": { name: "Guar Gum", description: "Natural thickener from guar beans", risk: "low" },
  "e414": { name: "Acacia Gum (Gum Arabic)", description: "Natural thickener from acacia trees", risk: "low" },
  "e415": { name: "Xanthan Gum", description: "Thickener produced by fermentation", risk: "low" },
  "e420": { name: "Sorbitol", description: "Sugar alcohol sweetener", risk: "low" },
  "e421": { name: "Mannitol", description: "Sugar alcohol sweetener", risk: "low" },
  "e422": { name: "Glycerol", description: "Humectant and sweetener", risk: "low" },
  "e440": { name: "Pectin", description: "Natural gelling agent from fruits", risk: "low" },
  "e450": { name: "Diphosphates", description: "Raising agent and emulsifier", risk: "low" },
  "e451": { name: "Triphosphates", description: "Emulsifier and stabilizer", risk: "low" },
  "e452": { name: "Polyphosphates", description: "Water retention agent in processed meats", risk: "medium" },
  "e460": { name: "Cellulose", description: "Plant fiber, thickener and anti-caking", risk: "low" },
  "e461": { name: "Methyl Cellulose", description: "Modified cellulose thickener", risk: "low" },
  "e466": { name: "Carboxymethyl Cellulose", description: "Modified cellulose thickener", risk: "low" },
  "e471": { name: "Mono- and Diglycerides", description: "Common emulsifiers from fats", risk: "low" },
  "e472": { name: "Fatty Acid Esters", description: "Emulsifiers", risk: "low" },
  "e481": { name: "Sodium Stearoyl Lactylate", description: "Emulsifier in baked goods", risk: "low" },
  "e500": { name: "Sodium Carbonates", description: "Baking soda and raising agents", risk: "low" },
  "e501": { name: "Potassium Carbonates", description: "Raising agent", risk: "low" },
  "e503": { name: "Ammonium Carbonates", description: "Raising agent", risk: "low" },
  "e504": { name: "Magnesium Carbonates", description: "Anti-caking agent", risk: "low" },

  // Flavor Enhancers (E600-E699)
  "e620": { name: "Glutamic Acid", description: "Natural amino acid, flavor enhancer", risk: "low" },
  "e621": { name: "Monosodium Glutamate (MSG)", description: "Flavor enhancer, some sensitivity", risk: "medium" },
  "e622": { name: "Monopotassium Glutamate", description: "Flavor enhancer similar to MSG", risk: "medium" },
  "e627": { name: "Disodium Guanylate", description: "Flavor enhancer, often with MSG", risk: "low" },
  "e631": { name: "Disodium Inosinate", description: "Flavor enhancer, often with MSG", risk: "low" },
  "e635": { name: "Disodium 5'-Ribonucleotides", description: "Flavor enhancer blend", risk: "low" },

  // Sweeteners (E900-E999)
  "e900": { name: "Dimethylpolysiloxane", description: "Anti-foaming agent", risk: "low" },
  "e901": { name: "Beeswax", description: "Natural coating from bees", risk: "low" },
  "e903": { name: "Carnauba Wax", description: "Natural plant wax coating", risk: "low" },
  "e904": { name: "Shellac", description: "Natural resin coating from insects", risk: "low" },
  "e950": { name: "Acesulfame K", description: "Artificial sweetener", risk: "medium" },
  "e951": { name: "Aspartame", description: "Artificial sweetener, some controversy", risk: "medium" },
  "e952": { name: "Cyclamate", description: "Artificial sweetener, banned in US", risk: "high" },
  "e954": { name: "Saccharin", description: "Artificial sweetener, oldest synthetic", risk: "medium" },
  "e955": { name: "Sucralose", description: "Artificial sweetener (Splenda)", risk: "low" },
  "e960": { name: "Steviol Glycosides", description: "Natural sweetener from stevia plant", risk: "low" },
  "e965": { name: "Maltitol", description: "Sugar alcohol sweetener", risk: "low" },
  "e966": { name: "Lactitol", description: "Sugar alcohol sweetener", risk: "low" },
  "e967": { name: "Xylitol", description: "Sugar alcohol sweetener", risk: "low" },
  "e968": { name: "Erythritol", description: "Sugar alcohol sweetener, well tolerated", risk: "low" }
};

/**
 * Get chemical information by code
 * @param {string} code - E-number code (e.g., "E171", "e171", "171")
 * @returns {object|null} Chemical information or null if not found
 */
function getChemicalInfo(code) {
  // Normalize the code: lowercase, ensure 'e' prefix
  let normalizedCode = code.toLowerCase().trim();
  if (!normalizedCode.startsWith('e')) {
    normalizedCode = 'e' + normalizedCode;
  }
  
  return chemicalCodes[normalizedCode] || null;
}

/**
 * Parse and map all additive codes from a text or array
 * @param {string|array} additives - Additive codes as string or array
 * @returns {array} Array of additive information objects
 */
function parseAdditives(additives) {
  let codeList = [];
  
  if (typeof additives === 'string') {
    // Extract E-codes from text using regex
    const matches = additives.match(/e\d{3}[a-z]?/gi) || [];
    codeList = matches;
  } else if (Array.isArray(additives)) {
    codeList = additives;
  }
  
  return codeList.map(code => {
    const info = getChemicalInfo(code);
    return {
      code: code.toUpperCase(),
      name: info ? info.name : "Unknown Additive",
      description: info ? info.description : "Information not available",
      risk: info ? info.risk : "unknown"
    };
  });
}

module.exports = {
  chemicalCodes,
  getChemicalInfo,
  parseAdditives
};

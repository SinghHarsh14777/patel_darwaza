// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  
  // 👇 Multilingual Name
  name: { 
    en: { type: String, required: true },
    hi: { type: String, required: true }
  },
  
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  price: { type: Number, default: null },
  
  // Stock field (Aapne jo add kiya tha)
  stock: { type: Number, required: true, default: 0 }, 
  
  // 👇 Multilingual Description
  description: { 
    en: { type: String, required: true },
    hi: { type: String, required: true }
  },
  
  dimensions: { type: String, required: true },
  material: { type: String, required: true },
  image: { type: String, required: true },
  featured: { type: Boolean, default: false }
});

module.exports = mongoose.model('Product', productSchema);
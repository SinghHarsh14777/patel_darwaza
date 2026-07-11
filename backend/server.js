require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/ProductRoute');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes configuration
app.use('/api/products', productRoutes);

// === NAYA TRANSLATE ROUTE ===
// Ye frontend se text lega aur Google API se translate karke wapas bhejega
app.get('/api/translate', async (req, res) => {
  const { text } = req.query;
  
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(text)}`;
    
    // Node.js ka inbuilt fetch use kar rahe hain
    const response = await fetch(url);
    if (!response.ok) throw new Error("Google Translate API failed");
    
    const data = await response.json();
    res.json({ translatedText: data[0][0][0] });
    
  } catch (error) {
    console.error('Translation Error:', error.message);
    res.status(500).json({ error: "Translation failed" });
  }
});
// ==============================

// Ek basic test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

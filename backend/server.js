const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/ProductRoute'); // Apni route file import ki

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS frontend (React) aur backend (Node) ko aapas mein baat karne ki permission deta hai
app.use(cors()); 
// JSON data (req.body) ko properly read karne ke liye
app.use(express.json()); 

// MongoDB Connection
// 'your_database_name' ko apne hisaab se change kar lein
const MONGO_URI = 'mongodb://127.0.0.1:27017/earthworks'; 

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes configuration
// Jab bhi koi '/api/products' par aayega, usko productRoutes file handle karegi
app.use('/api/products', productRoutes);

// Ek basic test route (Optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
const express = require('express');
const Product = require('../models/Product'); // Note: path updated to '../'
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const router = express.Router();

cloudinary.config({ 
  cloud_name: 'dwyngm3ue', 
  api_key: '398672298737435', 
  api_secret: '-O7-zowgOVJMtoa5DLb9Q-Z6dd4' 
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ==========================================
// POST: Naya product add karne ke liye API
// ==========================================
router.post('/', upload.single('image'), async (req, res) => {
  try {
    let imageUrl = '';

    // Agar frontend se file aayi hai, toh pehle usko Cloudinary par bhejo
    if (req.file) {
      // Buffer ko base64 format mein convert kar rahe hain Cloudinary ke liye
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'my_store_products', // Cloudinary mein is folder mein save hoga
      });
      
      imageUrl = result.secure_url; // Cloudinary se URL mil gaya
    } else {
      return res.status(400).json({ message: 'Image is required!' });
    }

    // 👇 Stringify hoke aaye hue Name aur Description ko wapas Object me convert kar rahe hain
    const parsedName = typeof req.body.name === 'string' ? JSON.parse(req.body.name) : req.body.name;
    const parsedDescription = typeof req.body.description === 'string' ? JSON.parse(req.body.description) : req.body.description;

    // Ab product ka data aur Cloudinary image URL database mein save karein
    const productData = {
      ...req.body,
      name: parsedName,               // Object { en: '...', hi: '...' }
      description: parsedDescription, // Object { en: '...', hi: '...' }
      price: req.body.price !== 'null' ? Number(req.body.price) : null,
      stock: Number(req.body.stock),
      featured: req.body.featured === 'true',
      image: imageUrl 
    };

    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: 'Product added successfully!',
      product: savedProduct
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error adding product', 
      error: error.message 
    });
  }
});

// ==========================================
// GET: All products fetch karne ki API
// ==========================================
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// ==========================================
// PUT: Product update karne ki API
// ==========================================
router.put('/:id', async (req, res) => {
  try {
    let updateData = { ...req.body };

    // Agar frontend Update karte waqt bhi string bhejta hai, toh use parse kar lo
    if (typeof updateData.name === 'string') {
      updateData.name = JSON.parse(updateData.name);
    }
    if (typeof updateData.description === 'string') {
      updateData.description = JSON.parse(updateData.description);
    }

    // req.params.id se custom 'id' (jaise rd-001) milega
    const updatedProduct = await Product.findOneAndUpdate(
      { id: req.params.id }, 
      updateData, 
      { new: true } // new: true ka matlab hai update hone ke baad naya data return karega
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product nahi mila' });
    }

    res.json({
      message: 'Product successfully update ho gaya!',
      product: updatedProduct
    });
  } catch (error) {
    res.status(400).json({ message: 'Update karne mein error aayi', error: error.message });
  }
});

module.exports = router;
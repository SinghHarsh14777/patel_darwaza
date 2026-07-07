// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product'); 

const productsData = [
  {
    id: 'rd-001',
    name: {
      en: 'Classic Diamond Pattern Roshan Daan',
      hi: 'क्लासिक डायमंड पैटर्न रोशनदान'
    },
    category: 'construction',
    subcategory: 'Roshan Daan',
    price: 450,
    description: {
      en: 'Traditional diamond lattice design concrete ventilation window. Perfect for kitchens and bathrooms, allowing airflow while maintaining privacy.',
      hi: 'पारंपरिक डायमंड जाली डिज़ाइन वाली कंक्रीट वेंटिलेशन विंडो। रसोई और बाथरूम के लिए एकदम सही, जो प्राइवेसी के साथ हवा का प्रवाह बनाए रखती है।'
    },
    dimensions: '24" x 24" x 3"',
    material: 'Reinforced Cement Concrete (RCC)',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
    featured: true,
  },
  {
    id: 'rd-002',
    name: {
      en: 'Geometric Floral Roshan Daan',
      hi: 'जियोमेट्रिक फ्लोरल रोशनदान'
    },
    category: 'construction',
    subcategory: 'Roshan Daan',
    price: 550,
    description: {
      en: 'Intricate floral geometric pattern providing elegant ventilation. Ideal for living rooms and exterior walls.',
      hi: 'जटिल फ्लोरल ज्यामितीय पैटर्न जो शानदार वेंटिलेशन प्रदान करता है। लिविंग रूम और बाहरी दीवारों के लिए आदर्श।'
    },
    dimensions: '30" x 30" x 3"',
    material: 'Premium Cement with Iron Reinforcement',
    image: 'https://images.unsplash.com/photo-1558618047-f4b511e7c7e2?w=500',
  },
  {
    id: 'rd-003',
    name: {
      en: 'Hexagonal Mesh Roshan Daan',
      hi: 'हेक्सागोनल मेश रोशनदान'
    },
    category: 'construction',
    subcategory: 'Roshan Daan',
    price: 380,
    description: {
      en: 'Modern hexagonal honeycomb design. Maximizes airflow with contemporary aesthetics.',
      hi: 'आधुनिक हेक्सागोनल हनीकॉम्ब (मधुमक्खी के छत्ते जैसा) डिज़ाइन। समकालीन सौंदर्य के साथ हवा के प्रवाह को अधिकतम करता है।'
    },
    dimensions: '18" x 18" x 2.5"',
    material: 'High-Strength Concrete',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500',
  },
  {
    id: 'bp-001',
    name: {
      en: 'Standard Boundary Pillar',
      hi: 'स्टैंडर्ड बाउंड्री पिलर (खंभा)'
    },
    category: 'construction',
    subcategory: 'Boundary Pillars',
    price: 280,
    description: {
      en: 'Durable cement pillar for farm and property boundary fencing. Pre-drilled holes for wire attachment.',
      hi: 'खेत और संपत्ति की बाउंड्री फेंसिंग के लिए टिकाऊ सीमेंट का खंभा। तार बांधने के लिए पहले से बने छेद मौजूद हैं।'
    },
    dimensions: '6ft x 4" x 4"',
    material: 'Precast Reinforced Concrete',
    image: 'https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?w=500',
    featured: true,
  },
  {
    id: 'bp-002',
    name: {
      en: 'Heavy Duty Corner Pillar',
      hi: 'हैवी ड्यूटी कॉर्नर पिलर'
    },
    category: 'construction',
    subcategory: 'Boundary Pillars',
    price: 450,
    description: {
      en: 'Extra-strong corner pillar designed to handle tension from multiple wire directions.',
      hi: 'कई दिशाओं से तारों के खिंचाव को संभालने के लिए डिज़ाइन किया गया अतिरिक्त मजबूत कॉर्नर खंभा।'
    },
    dimensions: '7ft x 5" x 5"',
    material: 'Steel-Reinforced Concrete',
    image: 'https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=500',
  },
  {
    id: 'sd-001',
    name: {
      en: 'River Sand (Fine Grade)',
      hi: 'नदी की रेत (महीन)'
    },
    category: 'construction',
    subcategory: 'Sand',
    price: null,
    description: {
      en: 'Premium quality fine river sand, perfect for plastering and finishing work. Washed and graded.',
      hi: 'प्रीमियम क्वालिटी की महीन नदी की रेत, प्लास्टर और फिनिशिंग काम के लिए बिल्कुल सही। धुली हुई और छानी हुई।'
    },
    dimensions: 'Per Cubic Foot / Trolley',
    material: 'Natural River Sand',
    image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=500',
  },
  {
    id: 'sd-002',
    name: {
      en: 'Construction Sand (Coarse)',
      hi: 'निर्माण रेत (मोटी)'
    },
    category: 'construction',
    subcategory: 'Sand',
    price: null,
    description: {
      en: 'Coarse-grade sand ideal for concrete mixing and foundation work. High binding strength.',
      hi: 'कंक्रीट मिक्सिंग और नींव के काम के लिए आदर्श मोटी रेत। इसमें बांधने की उच्च क्षमता (Binding Strength) है।'
    },
    dimensions: 'Per Cubic Foot / Trolley',
    material: 'Crushed Stone Sand',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500',
    featured: true,
  },
  {
    id: 'fp-001',
    name: {
      en: 'Industrial Farming Pot - Large',
      hi: 'इंडस्ट्रियल फार्मिंग गमला - बड़ा'
    },
    category: 'gardening',
    subcategory: 'Farming Pots',
    price: 1200,
    description: {
      en: 'Heavy-duty concrete pot for large-scale farming. Weather-resistant with excellent drainage.',
      hi: 'बड़े पैमाने पर खेती के लिए हैवी-ड्यूटी कंक्रीट का गमला। मौसम प्रतिरोधी और पानी निकलने की उत्कृष्ट व्यवस्था।'
    },
    dimensions: '36" diameter x 30" height',
    material: 'Fiber-Reinforced Concrete',
    image: 'https://res.cloudinary.com/dwyngm3ue/image/upload/v1766324231/unnamed_dztfkb.jpg',
    featured: true,
  },
  {
    id: 'fp-002',
    name: {
      en: 'Terracotta Farming Urn',
      hi: 'टेराकोटा फार्मिंग गमला'
    },
    category: 'gardening',
    subcategory: 'Farming Pots',
    price: 850,
    description: {
      en: 'Traditional terracotta pot with natural temperature regulation. Perfect for vegetable farming.',
      hi: 'प्राकृतिक तापमान नियंत्रण के साथ पारंपरिक टेराकोटा गमला। सब्जियों की खेती के लिए एकदम उत्तम।'
    },
    dimensions: '28" diameter x 24" height',
    material: 'Kiln-Fired Clay',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=500',
  },
  {
    id: 'fp-003',
    name: {
      en: 'Rectangular Farm Planter',
      hi: 'आयताकार फार्म प्लांटर'
    },
    category: 'gardening',
    subcategory: 'Farming Pots',
    price: 980,
    description: {
      en: 'Long rectangular planter ideal for row crops and herbs. Built-in water reservoir.',
      hi: 'पंक्ति वाली फसलों और जड़ी-बूटियों के लिए आदर्श लंबा आयताकार प्लांटर। इसमें पानी जमा रहने की सुविधा है।'
    },
    dimensions: '48" x 18" x 16"',
    material: 'Reinforced Cement',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=500',
  },
  {
    id: 'dp-001',
    name: {
      en: 'Modern Geometric Designer Pot',
      hi: 'मॉडर्न जियोमेट्रिक डिज़ाइनर गमला'
    },
    category: 'gardening',
    subcategory: 'Designer Pots',
    price: 650,
    description: {
      en: 'Contemporary geometric design for modern interiors. Matte finish with clean lines.',
      hi: 'आधुनिक इंटीरियर के लिए समकालीन ज्यामितीय डिज़ाइन। साफ लाइनों के साथ मैट फिनिश।'
    },
    dimensions: '14" diameter x 16" height',
    material: 'Polished Concrete',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500',
    featured: true,
  },
  {
    id: 'dp-002',
    name: {
      en: 'Artisan Carved Stone Pot',
      hi: 'हैंडक्राफ्टेड नक्काशीदार पत्थर का गमला'
    },
    category: 'gardening',
    subcategory: 'Designer Pots',
    price: 1100,
    description: {
      en: 'Hand-carved decorative pot with traditional motifs. Each piece is unique.',
      hi: 'पारंपरिक रूपांकनों (motifs) के साथ हाथ से उकेरा गया सजावटी गमला। हर पीस अपने आप में अनूठा है।'
    },
    dimensions: '18" diameter x 20" height',
    material: 'Natural Sandstone',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=500',
  },
  {
    id: 'dp-003',
    name: {
      en: 'Minimalist Cylinder Planter',
      hi: 'मिनिमलिस्ट सिलेंडर प्लांटर'
    },
    category: 'gardening',
    subcategory: 'Designer Pots',
    price: 480,
    description: {
      en: 'Sleek cylindrical design perfect for succulents and indoor plants. Available in multiple colors.',
      hi: 'रसीले (succulents) और इनडोर पौधों के लिए बेहतरीन स्लीक बेलनाकार डिज़ाइन। कई रंगों में उपलब्ध।'
    },
    dimensions: '10" diameter x 12" height',
    material: 'Fiber Cement',
    image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=500',
  }
];

const seedDB = async () => {
  try {
    // Apna MongoDB URL yahan update karein
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Naya data daalne se pehle purana clear kar dega (taaki duplicate na ho)
    await Product.deleteMany({}); 
    console.log('🗑️  Old products cleared');

    // Data insert ho raha hai
    await Product.insertMany(productsData);
    console.log('🎉 All products added to MongoDB successfully!');

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
    mongoose.connection.close();
  }
};

seedDB();

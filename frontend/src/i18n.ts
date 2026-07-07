import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // =========================
      // APP / COMMON SECTION
      // =========================
      "why_choose_us": "Why Choose Us",
      "quality_trust": "Quality & Trust",

      // =========================
      // HERO SECTION
      // =========================
      "hero_badge": "Premium Quality Materials Since 1995",
      "hero_title_1": "BUILD STRONG",
      "hero_title_2": "GROW GREEN",
      "hero_subtitle": "Your trusted source for premium construction materials and farming essentials. From durable cement products to beautiful garden solutions.",
      "hero_btn_catalog": "Browse Catalog",
      "hero_btn_quote": "Request Quote",
      "hero_stat_products": "Products",
      "hero_stat_years": "Years",
      "hero_stat_customers": "Customers",

      // =========================
      // ABOUT SECTION
      // =========================
      "about_why_choose": "Why Choose Us",
      "about_heading": "QUALITY YOU CAN TRUST",
      "about_desc": "For over 28 years, Earthworks has been the trusted name in construction and farming materials. We take pride in supplying only the finest quality products that stand the test of time.",
      "about_custom_title": "Made to Your Specifications",
      "about_custom_desc_1": "We understand that every project is unique. That’s why we offer ",
      "about_custom_desc_bold": "custom fabrication services",
      "about_custom_desc_2": ". Whether you need specific dimensions for Roshan Daans or a unique structure for your boundary, our artisans craft materials precisely as per your demand and requirements.",
      "about_trust_line": "Building trust, one custom product at a time",
      
      // Features Array
      "feat_premium_title": "Premium Quality",
      "feat_premium_desc": "All our cement products use Grade 53 OPC cement for maximum durability and strength.",
      "feat_cert_title": "Certified Materials",
      "feat_cert_desc": "ISO certified manufacturing process ensuring consistent quality in every product.",
      "feat_delivery_title": "Reliable Delivery",
      "feat_delivery_desc": "We deliver heavy materials safely to your site with our specialized transport fleet.",
      "feat_custom_title": "Customized Fabrication",
      "feat_custom_desc": "We tailor-make designs and dimensions exactly according to your site requirements.",

      // =========================
      // PRODUCT CATALOG SECTION
      // =========================
      "catalog_subtitle": "Our Collection",
      "catalog_title": "EXPLORE OUR PRODUCTS",
      "catalog_desc": "From sturdy construction materials to beautiful garden essentials, we have everything you need for your projects.",
      "catalog_loading": "Loading products...",
      "catalog_error": "Error:",
      "catalog_try_again": "Try Again",
      "catalog_empty": "No products found in this category.",
      
      // Categories (Exact same names as your products.ts category names)
      "All Products": "All Products",
      "Construction": "Construction",
      "Farming": "Farming",

      // =========================
      // PRODUCT CARD
      // =========================
      "prod_featured": "Featured",
      "prod_out_of_stock": "Out of Stock",
      "prod_low_stock": "Only {{count}} Left!",
      "prod_ask_price": "Ask for Price",
      "prod_unavailable": "Unavailable",
      "prod_view": "View",

      // =========================
      // PRODUCT MODAL
      // =========================
      "modal_out_of_stock": "Out of Stock",
      "modal_in_stock": "{{count}} In Stock",
      "modal_contact_pricing": "Contact for Pricing",
      "modal_dimensions": "Dimensions",
      "modal_material": "Material",
      "modal_btn_unavailable": "Currently Unavailable",
      "modal_btn_whatsapp": "Inquire on WhatsApp",
      "modal_msg_out_of_stock": "This item is currently out of stock.",
      "modal_whatsapp_template": "Hi! I'm interested in the \"{{name}}\" ({{dimensions}}). Could you please provide more details and pricing?",

      // =========================
      // CONTACT SECTION
      // =========================
      "contact_get_in_touch": "Get In Touch",
      "contact_title": "REQUEST A QUOTE",
      "contact_desc": "Planning a construction project or setting up a garden? Let us help you with quality materials. Fill out the form and we'll get back to you soon.",
      "contact_call_us": "Call Us",
      "contact_email": "Email",
      "contact_location": "Location",
      "contact_loc_value": "Pindra Bazzar, Varanasi",
      "contact_ph_name": "Your Name",
      "contact_ph_phone": "Phone Number",
      "contact_ph_msg": "Tell us your requirements...",
      "contact_btn_wa": "Send via WhatsApp",
      
      // Contact Form Errors & Toasts
      "err_name_req": "Name is required",
      "err_name_long": "Name too long",
      "err_phone_req": "Valid phone required",
      "err_phone_long": "Phone too long",
      "err_msg_req": "Message is required",
      "err_msg_long": "Message too long",
      "toast_wa_title": "Opening WhatsApp...",
      "toast_wa_desc": "Redirecting you to our chat.",
      "contact_wa_template": "*New Inquiry from Earthly Builds*\n\nName: {{name}}\nPhone: {{phone}}\nRequirement: {{message}}"
    }
  },
  hi: {
    translation: {
      // =========================
      // APP / COMMON SECTION
      // =========================
      "why_choose_us": "हमें क्यों चुनें",
      "quality_trust": "गुणवत्ता और विश्वास",

      // =========================
      // HERO SECTION
      // =========================
      "hero_badge": "1995 से उच्च गुणवत्ता वाली सामग्री",
      "hero_title_1": "मजबूत बनाएं",
      "hero_title_2": "हरा-भरा उगाएं",
      "hero_subtitle": "प्रीमियम निर्माण सामग्री और खेती की ज़रूरतों के लिए आपका भरोसेमंद स्रोत। टिकाऊ सीमेंट उत्पादों से लेकर बेहतरीन गार्डन सोलूशन्स तक।",
      "hero_btn_catalog": "कैटलॉग देखें",
      "hero_btn_quote": "कोटेशन मांगें",
      "hero_stat_products": "उत्पाद",
      "hero_stat_years": "वर्ष",
      "hero_stat_customers": "ग्राहक",

      // =========================
      // ABOUT SECTION
      // =========================
      "about_why_choose": "हमें क्यों चुनें",
      "about_heading": "गुणवत्ता जिस पर आप भरोसा कर सकें",
      "about_desc": "पिछले 28 से अधिक वर्षों से, निर्माण और खेती सामग्री में अर्थवर्क्स (Earthworks) एक भरोसेमंद नाम रहा है। हमें केवल बेहतरीन गुणवत्ता वाले उत्पादों की आपूर्ति करने पर गर्व है जो समय की कसौटी पर खरे उतरते हैं।",
      "about_custom_title": "आपकी आवश्यकता के अनुसार निर्मित",
      "about_custom_desc_1": "हम समझते हैं कि हर प्रोजेक्ट अलग होता है। इसलिए हम ",
      "about_custom_desc_bold": "कस्टम फैब्रिकेशन सेवाएं",
      "about_custom_desc_2": " प्रदान करते हैं। चाहे आपको रोशनदान के लिए विशिष्ट आकार चाहिए या बाउंड्री के लिए कोई अनोखा ढांचा, हमारे कारीगर आपकी मांग और आवश्यकताओं के अनुसार सटीकता से सामग्री तैयार करते हैं।",
      "about_trust_line": "हर कस्टम उत्पाद के साथ विश्वास बनाना",

      // Features Array
      "feat_premium_title": "प्रीमियम गुणवत्ता",
      "feat_premium_desc": "हमारे सभी सीमेंट उत्पादों में अधिकतम टिकाऊपन और मजबूती के लिए ग्रेड 53 OPC सीमेंट का उपयोग होता है।",
      "feat_cert_title": "प्रमाणित सामग्री",
      "feat_cert_desc": "ISO प्रमाणित निर्माण प्रक्रिया हर उत्पाद में निरंतर गुणवत्ता सुनिश्चित करती है।",
      "feat_delivery_title": "विश्वसनीय डिलीवरी",
      "feat_delivery_desc": "हम अपने विशेष परिवहन बेड़े के साथ भारी सामग्री सुरक्षित रूप से आपकी साइट पर पहुंचाते हैं।",
      "feat_custom_title": "कस्टम फैब्रिकेशन",
      "feat_custom_desc": "हम आपकी साइट की आवश्यकताओं के अनुसार बिल्कुल सटीक डिज़ाइन और आकार बनाते हैं।",

      // =========================
      // PRODUCT CATALOG SECTION
      // =========================
      "catalog_subtitle": "हमारा संग्रह",
      "catalog_title": "हमारे उत्पादों को एक्सप्लोर करें",
      "catalog_desc": "मजबूत निर्माण सामग्री से लेकर बगीचे की आवश्यक वस्तुओं तक, आपके प्रोजेक्ट के लिए ज़रूरी सब कुछ हमारे पास है।",
      "catalog_loading": "उत्पाद लोड हो रहे हैं...",
      "catalog_error": "त्रुटि:",
      "catalog_try_again": "पुनः प्रयास करें",
      "catalog_empty": "इस श्रेणी में कोई उत्पाद नहीं मिला।",
      
      // Categories 
      "All Products": "सभी उत्पाद",
      "Construction": "निर्माण",
      "Farming": "खेती",

      // =========================
      // PRODUCT CARD
      // =========================
      "prod_featured": "फीचर्ड",
      "prod_out_of_stock": "स्टॉक में नहीं",
      "prod_low_stock": "केवल {{count}} बचे हैं!",
      "prod_ask_price": "कीमत पूछें",
      "prod_unavailable": "अनुपलब्ध",
      "prod_view": "देखें",

      // =========================
      // PRODUCT MODAL
      // =========================
      "modal_out_of_stock": "स्टॉक में नहीं",
      "modal_in_stock": "{{count}} स्टॉक में हैं",
      "modal_contact_pricing": "कीमत के लिए संपर्क करें",
      "modal_dimensions": "आयाम (Dimensions)",
      "modal_material": "सामग्री (Material)",
      "modal_btn_unavailable": "वर्तमान में अनुपलब्ध",
      "modal_btn_whatsapp": "WhatsApp पर पूछताछ करें",
      "modal_msg_out_of_stock": "यह आइटम वर्तमान में स्टॉक में नहीं है।",
      "modal_whatsapp_template": "नमस्ते! मुझे \"{{name}}\" ({{dimensions}}) में दिलचस्पी है। क्या आप कृपया अधिक विवरण और कीमत प्रदान कर सकते हैं?",

      // =========================
      // CONTACT SECTION
      // =========================
      "contact_get_in_touch": "संपर्क करें",
      "contact_title": "कोटेशन मांगें",
      "contact_desc": "क्या आप किसी निर्माण परियोजना या बगीचे की योजना बना रहे हैं? गुणवत्तापूर्ण सामग्री के साथ हमें आपकी मदद करने दें। फॉर्म भरें और हम जल्द ही आपसे संपर्क करेंगे।",
      "contact_call_us": "कॉल करें",
      "contact_email": "ईमेल",
      "contact_location": "स्थान",
      "contact_loc_value": "पिंडरा बाज़ार, वाराणसी",
      "contact_ph_name": "आपका नाम",
      "contact_ph_phone": "फ़ोन नंबर",
      "contact_ph_msg": "अपनी आवश्यकताएं बताएं...",
      "contact_btn_wa": "WhatsApp से भेजें",
      
      // Contact Form Errors & Toasts
      "err_name_req": "नाम दर्ज करना आवश्यक है",
      "err_name_long": "नाम बहुत लंबा है",
      "err_phone_req": "मान्य फ़ोन नंबर आवश्यक है",
      "err_phone_long": "फ़ोन नंबर बहुत लंबा है",
      "err_msg_req": "संदेश आवश्यक है",
      "err_msg_long": "संदेश बहुत लंबा है",
      "toast_wa_title": "WhatsApp खुल रहा है...",
      "toast_wa_desc": "हम आपको हमारी चैट पर रीडायरेक्ट कर रहे हैं।",
      "contact_wa_template": "*Earthly Builds से नई पूछताछ*\n\nनाम: {{name}}\nफ़ोन: {{phone}}\nआवश्यकता: {{message}}"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already does escaping, so this is safe
    }
  });

export default i18n;
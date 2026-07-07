import { useState } from 'react';
import { Loader2, UploadCloud, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 👇 name aur description ko English aur Hindi me tod diya gaya hai
const initialFormState = { 
  id: '', 
  nameEn: '', nameHi: '', 
  category: 'construction', subcategory: '', 
  price: '', stock: '', 
  descriptionEn: '', descriptionHi: '', 
  dimensions: '', material: '', featured: false 
};

const AddProduct = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); 
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert('⚠️ Please select an image!');
      return;
    }

    setIsSubmitting(true);
    
    const submitData = new FormData();
    submitData.append('image', imageFile);
    submitData.append('id', formData.id);
    
    // 👇 Name aur Description ko JSON string banakar bhej rahe hain taaki DB schema se match kare
    submitData.append('name', JSON.stringify({ en: formData.nameEn, hi: formData.nameHi }));
    submitData.append('description', JSON.stringify({ en: formData.descriptionEn, hi: formData.descriptionHi }));
    
    submitData.append('category', formData.category);
    submitData.append('subcategory', formData.subcategory);
    submitData.append('price', formData.price ? formData.price : 'null');
    submitData.append('stock', formData.stock);
    submitData.append('dimensions', formData.dimensions);
    submitData.append('material', formData.material);
    submitData.append('featured', String(formData.featured));

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: submitData 
      });
      
      if (!response.ok) throw new Error('Failed to add product');
      alert('✅ Product Added Successfully!');
      navigate('/manage-products'); 
    } catch (error) {
      console.error(error);
      alert('❌ Error adding product. Backend check karein.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in mb-10">
      <div className="bg-slate-800 p-6 text-white">
        <h2 className="text-xl font-bold">Add New Product</h2>
        <p className="text-slate-400 text-sm mt-1">Add product details in both English and Hindi.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        
        {/* --- Image Upload Section --- */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">Product Image</label>
          
          {!imagePreview ? (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-emerald-500 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-10 h-10 text-gray-400 mb-3" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          ) : (
            <div className="relative w-full h-64 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center group">
              <img src={imagePreview} alt="Preview" className="max-h-full object-contain" />
              <button 
                type="button" 
                onClick={removeImage} 
                className="absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-md transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Product ID */}
        <div>
          <label className="text-sm font-medium text-slate-700">Product ID  </label>
          <input required name="id" value={formData.id} onChange={handleInputChange} className="mt-1 px-4 py-2 border rounded-lg w-full md:w-1/2 focus:ring-2 focus:ring-emerald-500 outline-none" />
        </div>

        {/* 👇 Multilingual Name Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div>
            <label className="text-sm font-medium text-slate-700">Product Name (English)</label>
            <input required name="nameEn" placeholder="e.g. Red Bricks" value={formData.nameEn} onChange={handleInputChange} className="mt-1 px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Product Name (Hindi)</label>
            <input required name="nameHi" placeholder="उदा. लाल ईंटें" value={formData.nameHi} onChange={handleInputChange} className="mt-1 px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-slate-700">Category</label>
            <select name="category" value={formData.category} onChange={handleInputChange} className="mt-1 px-4 py-2 border rounded-lg w-full bg-white focus:ring-2 focus:ring-emerald-500 outline-none">
              <option value="construction">Construction</option>
              <option value="gardening">Gardening</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Subcategory</label>
            <input required name="subcategory" value={formData.subcategory} onChange={handleInputChange} className="mt-1 px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="text-sm font-medium text-slate-700">Price (₹)</label>
            <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Blank for Ask" className="mt-1 px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Stock (Pcs)</label>
            <input required type="number" min="0" name="stock" value={formData.stock} onChange={handleInputChange} className="mt-1 px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Dimensions</label>
            <input required name="dimensions" value={formData.dimensions} onChange={handleInputChange} className="mt-1 px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Material</label>
            <input required name="material" value={formData.material} onChange={handleInputChange} className="mt-1 px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
        </div>

        {/* 👇 Multilingual Description Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div>
            <label className="text-sm font-medium text-slate-700">Description (English)</label>
            <textarea required name="descriptionEn" value={formData.descriptionEn} onChange={handleInputChange} rows={4} className="mt-1 px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-emerald-500 outline-none"></textarea>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Description (Hindi)</label>
            <textarea required name="descriptionHi" value={formData.descriptionHi} onChange={handleInputChange} rows={4} className="mt-1 px-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-emerald-500 outline-none"></textarea>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border">
          <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleInputChange} className="w-5 h-5 accent-emerald-600" />
          <label htmlFor="featured" className="font-medium text-slate-700 cursor-pointer">Set as Featured Product on homepage</label>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex justify-center items-center gap-2 transition-colors disabled:opacity-70">
          {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <UploadCloud size={20} />} 
          {isSubmitting ? 'Uploading Product...' : 'Save Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
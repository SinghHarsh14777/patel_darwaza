import { useState, useEffect } from 'react';
import { Product } from '../types';
import { Loader2, Edit, X, UploadCloud, AlertCircle } from 'lucide-react';

const ManageProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  
  // Edit State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setFetchError(null);
      const res = await fetch('https://patel-darwaza.onrender.com/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setFetchError("Products load karne mein error aayi. Kripya baad mein try karein.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper Function: Object ya String ko safely read karne ke liye
  const getText = (val: any, lang: 'en' | 'hi' = 'en') => {
    if (!val) return '';
    if (typeof val === 'object') return val[lang] || val.en || '';
    return String(val); // Agar normal string hai toh wahi return karega
  };

  // Jab koi input edit kare (Nested Object support ke sath)
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (!editingProduct) return;
    const { name, value, type } = e.target;
    
    const isCheckbox = type === 'checkbox';
    const checked = isCheckbox ? (e.target as HTMLInputElement).checked : false;
    const finalValue = isCheckbox ? checked : value;

    // Agar input ka name 'name.en' ya 'description.hi' format mein hai
    if (name.includes('.')) {
      const [field, lang] = name.split('.'); 
      
      const currentFieldValue = editingProduct[field as keyof Product];
      
      setEditingProduct({
        ...editingProduct,
        [field]: {
          ...(typeof currentFieldValue === 'object' ? currentFieldValue : { en: currentFieldValue }),
          [lang]: finalValue
        }
      });
    } else {
      // Normal flat values (price, stock, etc.) ke liye
      setEditingProduct({
        ...editingProduct,
        [name]: finalValue
      });
    }
  };

  // const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!editingProduct) return;
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setEditingProduct({ ...editingProduct, image: reader.result as string });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProduct) return;
    const file = e.target.files?.[0];
    
    if (file) {
      // Yahan tum apni required width aur height set kar sakte ho
      const TARGET_WIDTH = 600; 
      const TARGET_HEIGHT = 600;
      const IMAGE_QUALITY = 0.7; // 0.0 se 1.0 ke beech (0.7 means 70% quality, good for web)

      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = TARGET_WIDTH;
          canvas.height = TARGET_HEIGHT;
          const ctx = canvas.getContext('2d');

          if (!ctx) return;

          // Center Crop Logic
          let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;
          const aspectRatio = TARGET_WIDTH / TARGET_HEIGHT;
          const imgAspectRatio = img.width / img.height;

          if (imgAspectRatio > aspectRatio) {
            // Image zyada wide hai (Landscape)
            sWidth = img.height * aspectRatio;
            sx = (img.width - sWidth) / 2; // Center mein align karne ke liye
          } else {
            // Image zyada tall hai (Portrait)
            sHeight = img.width / aspectRatio;
            sy = (img.height - sHeight) / 2; // Center mein align karne ke liye
          }

          // Canvas ko white background do (agar transparent PNG hui toh black background nahi aayega)
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);

          // Image ko canvas par crop karke draw karo
          ctx.drawImage(
            img, 
            sx, sy, sWidth, sHeight, // Source image ka konsa hissa lena hai
            0, 0, TARGET_WIDTH, TARGET_HEIGHT // Canvas par kahan draw karna hai
          );

          // Canvas se compress ki hui base64 string nikalo (JPEG format mein convert karke size reduce karna)
          const compressedBase64 = canvas.toDataURL('image/jpeg', IMAGE_QUALITY);
          
          // State update karo naye optimized image ke sath
          setEditingProduct({ ...editingProduct, image: compressedBase64 });
        };
      };
    }
  };
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`https://patel-darwaza.onrender.com/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingProduct,
          price: editingProduct.price ? Number(editingProduct.price) : null,
          stock: Number(editingProduct.stock)
        })
      });

      if (!response.ok) throw new Error('Update failed');
      
      alert('✅ Product Updated Successfully!');
      setEditingProduct(null); 
      fetchProducts(); 
      
    } catch (error) {
      alert('❌ Error updating product');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manage Products</h1>
          <p className="text-slate-500 text-sm mt-1">Apne sabhi products ko yahan se edit aur track karein.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-emerald-600 mb-4" size={32} />
          </div>
        ) : fetchError ? (
          <div className="flex flex-col justify-center items-center py-20 text-red-500">
            <AlertCircle size={40} className="mb-3 opacity-80" />
            <p className="font-medium">{fetchError}</p>
            <button 
              onClick={fetchProducts} 
              className="mt-4 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="p-4">Image</th>
                  <th className="p-4">ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500 font-medium">
                      No products found. Kripya naya product add karein.
                    </td>
                  </tr>
                ) : (
                  products.map(product => (
                    <tr key={product.id} className="border-b hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <img src={product.image} alt={getText(product.name)} className="w-12 h-12 object-cover rounded-lg border bg-gray-100" />
                      </td>
                      <td className="p-4 text-sm font-mono text-slate-500">{product.id}</td>
                      {/* Name ko safely getText se render kiya gaya hai */}
                      <td className="p-4 font-medium text-slate-900">{getText(product.name)}</td>
                      <td className="p-4 text-emerald-600 font-medium">
                        {product.price ? `₹${product.price}` : 'Ask'}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          product.stock > 10 ? 'bg-green-100 text-green-700' : 
                          product.stock > 0 ? 'bg-orange-100 text-orange-700' : 
                          'bg-red-100 text-red-700'
                        }`}>
                          {product.stock === 0 ? 'Out of Stock' : `${product.stock} Pcs`}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => setEditingProduct(product)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center w-full gap-2"
                          title="Edit Product"
                        >
                          <Edit size={18} /> Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* EDIT MODAL POPUP */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="sticky top-0 bg-slate-800 p-5 text-white flex justify-between items-center z-10">
              <h2 className="text-xl font-bold">Edit Product: {editingProduct.id}</h2>
              <button onClick={() => setEditingProduct(null)} className="p-1 hover:bg-slate-700 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-5">
              <div className="flex gap-6 items-center">
                <img src={editingProduct.image} alt="preview" className="w-24 h-24 object-cover rounded-xl border-2 border-gray-200" />
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-slate-700 rounded-lg cursor-pointer transition-colors border border-gray-300">
                  <UploadCloud size={20} /> Change Image
                  <input type="file" className="hidden" accept="image/*" onChange={handleEditImageUpload} />
                </label>
              </div>

              {/* Title Inputs (English & Hindi) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border">
                <div>
                  <label className="text-sm font-medium text-slate-700">Name (English)</label>
                  <input required name="name.en" value={getText(editingProduct.name, 'en')} onChange={handleEditChange} className="mt-1 px-3 py-2 border rounded-lg w-full focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Name (Hindi)</label>
                  <input name="name.hi" value={getText(editingProduct.name, 'hi')} onChange={handleEditChange} className="mt-1 px-3 py-2 border rounded-lg w-full focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="हिंदी नाम..." />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Category</label>
                  <select name="category" value={editingProduct.category} onChange={handleEditChange} className="mt-1 px-3 py-2 border rounded-lg w-full bg-white focus:ring-2 focus:ring-emerald-500 outline-none">
                    <option value="construction">Construction</option>
                    <option value="gardening">Gardening</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Subcategory</label>
                  <input required name="subcategory" value={getText(editingProduct.subcategory)} onChange={handleEditChange} className="mt-1 px-3 py-2 border rounded-lg w-full focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Price (₹)</label>
                  <input type="number" name="price" value={editingProduct.price || ''} onChange={handleEditChange} className="mt-1 px-3 py-2 border rounded-lg w-full focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Stock</label>
                  <input required type="number" name="stock" value={editingProduct.stock} onChange={handleEditChange} className="mt-1 px-3 py-2 border rounded-lg w-full focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Dimensions</label>
                  <input required name="dimensions" value={getText(editingProduct.dimensions)} onChange={handleEditChange} className="mt-1 px-3 py-2 border rounded-lg w-full focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Material</label>
                  <input required name="material" value={getText(editingProduct.material)} onChange={handleEditChange} className="mt-1 px-3 py-2 border rounded-lg w-full focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </div>

              {/* Description Inputs (English & Hindi) */}
              <div className="space-y-4 bg-slate-50 p-4 rounded-lg border">
                <div>
                  <label className="text-sm font-medium text-slate-700">Description (English)</label>
                  <textarea required name="description.en" value={getText(editingProduct.description, 'en')} onChange={handleEditChange} rows={3} className="mt-1 px-3 py-2 border rounded-lg w-full focus:ring-2 focus:ring-emerald-500 outline-none"></textarea>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Description (Hindi)</label>
                  <textarea name="description.hi" value={getText(editingProduct.description, 'hi')} onChange={handleEditChange} rows={3} className="mt-1 px-3 py-2 border rounded-lg w-full focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="हिंदी विवरण..."></textarea>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border">
                <input type="checkbox" id="edit-featured" name="featured" checked={editingProduct.featured} onChange={handleEditChange} className="w-5 h-5 accent-emerald-600 rounded" />
                <label htmlFor="edit-featured" className="font-medium text-slate-700 cursor-pointer">Featured Product</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setEditingProduct(null)} className="px-5 py-2 text-slate-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" disabled={isUpdating} className="px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                  {isUpdating ? <Loader2 className="animate-spin" size={18} /> : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;

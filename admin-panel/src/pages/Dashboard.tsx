import { useState, useEffect } from 'react';
import { Package, Layers, AlertTriangle, Loader2 } from 'lucide-react';
import { Product } from '../types';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalPieces: 0,
    outOfStock: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data: Product[]) => {
        // Live data calculation logic
        const uniqueProducts = data.length;
        
        // Saare products ke stock pieces ko plus (+) karna
        const piecesCount = data.reduce((total, item) => total + (item.stock || 0), 0);
        
        // Check karna ki kitne products ka stock === 0 hai
        const outOfStockCount = data.filter((item) => (item.stock || 0) === 0).length;

        setStats({
          totalProducts: uniqueProducts,
          totalPieces: piecesCount,
          outOfStock: outOfStockCount,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard data fetch error:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800">Overview Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Real-time database analytics aur inventory stock reports.</p>
      </div>
      
      {/* Loading state handle */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-emerald-600" size={40} />
        </div>
      ) : (
        /* Stats Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Unique Products */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
              <Package size={32} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unique Items</p>
              <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{stats.totalProducts} Types</h3>
            </div>
          </div>

          {/* Card 2: Total Available Pieces (Stock quantity) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
              <Layers size={32} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Inventory Stock</p>
              <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{stats.totalPieces} Pieces</h3>
            </div>
          </div>

          {/* Card 3: Out Of Stock items warning card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className={`p-4 rounded-xl ${stats.outOfStock > 0 ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-400'}`}>
              <AlertTriangle size={32} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Out Of Stock</p>
              <h3 className={`text-3xl font-extrabold mt-1 ${stats.outOfStock > 0 ? 'text-red-600' : 'text-slate-800'}`}>
                {stats.outOfStock} Items
              </h3>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Dashboard;
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Package, Settings } from 'lucide-react';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
          <Settings className="text-emerald-400 animate-spin-slow" size={24} />
          <h2 className="text-xl font-bold tracking-wider text-gray-100">STORE ADMIN</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {/* NavLink automatically active class laga deta hai */}
          <NavLink to="/" className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </NavLink>
          
          <NavLink to="/add-product" className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <PlusCircle size={20} />
            <span className="font-medium">Add Product</span>
          </NavLink>

          <NavLink to="/manage-products" className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <Package size={20} />
            <span className="font-medium">Manage Products</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Space */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet /> {/* Yahan par aapke alag-alag pages render honge */}
      </main>
    </div>
  );
};

export default Layout;
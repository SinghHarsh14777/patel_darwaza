import { useState } from 'react'; // 👇 useState import kiya
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Package, Settings, Menu, X } from 'lucide-react'; // 👇 Menu aur X icons import kiye

const Layout = () => {
  // 👇 Mobile sidebar toggle ke liye state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 👇 Link click par ya overlay par click par menu band karne ka function
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      
      {/* 👇 Mobile Topbar (Sirf mobile par dikhega, desktop par hidden rahega 'md:hidden') */}
      <div className="md:hidden bg-slate-900 text-white flex items-center justify-between p-4 z-20 fixed w-full top-0 shadow-md">
        <div className="flex items-center gap-2">
          <Settings className="text-emerald-400 animate-spin-slow" size={24} />
          <h2 className="text-xl font-bold tracking-wider text-gray-100">STORE ADMIN</h2>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-300 hover:text-white">
          {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 👇 Mobile Overlay Backdrop (Peeche ka dark hissa) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white flex flex-col shadow-xl
        transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* 👇 Header in Sidebar (Mobile par hide kiya hai kyunki topbar me de diya hai) */}
        <div className="hidden md:flex p-6 border-b border-slate-800 items-center gap-2">
          <Settings className="text-emerald-400 animate-spin-slow" size={24} />
          <h2 className="text-xl font-bold tracking-wider text-gray-100">STORE ADMIN</h2>
        </div>
        
        {/* mt-20 mobile ke topbar ki jagah chhodne ke liye hai */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto mt-20 md:mt-0">
          <NavLink 
            to="/" 
            onClick={closeSidebar} // 👇 Click par band hoga
            className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </NavLink>
          
          <NavLink 
            to="/add-product" 
            onClick={closeSidebar}
            className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <PlusCircle size={20} />
            <span className="font-medium">Add Product</span>
          </NavLink>

          <NavLink 
            to="/manage-products" 
            onClick={closeSidebar}
            className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Package size={20} />
            <span className="font-medium">Manage Products</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Space */}
      {/* 👇 pt-20 mobile topbar se bachne ke liye lagaya hai taaki content kategi nahi */}
      <main className="flex-1 overflow-y-auto p-4 pt-24 md:p-8 md:pt-8 w-full">
        <Outlet /> 
      </main>
      
    </div>
  );
};

export default Layout;

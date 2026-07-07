import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import ManageProducts from './pages/ManageProducts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout component saare pages ko wrap karega (isliye sidebar har page pe dikhega) */}
        <Route path="/" element={<Layout />}>
          {/* Jab koi '/' pe aayega, Dashboard khulega */}
          <Route index element={<Dashboard />} />
          
          {/* Jab koi '/add-product' pe aayega, AddProduct form khulega */}
          <Route path="add-product" element={<AddProduct />} />
          
          {/* Jab koi '/manage-products' pe aayega, ManageProducts table khulega */}
          <Route path="manage-products" element={<ManageProducts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
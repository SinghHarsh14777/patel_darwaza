// src/data/products.ts

export type Category = 'construction' | 'gardening';

export interface Product {
  _id?: string;        // MongoDB automatic internal ID (Optional rakha hai backend compatibility ke liye)
  id: string;          // Aapka custom unique ID (jaise 'rd-001', 'bp-002') jo form se add hota hai
  
  // 👇 name ko string ki jagah object me update kiya
  name: {
    en: string;
    hi: string;
  };
  
  category: Category;
  subcategory: string;
  price: number | null;
  stock: number;       // Nayi field integrate ki inventory management ke liye
  
  // 👇 description ko bhi string ki jagah object me update kiya
  description: {
    en: string;
    hi: string;
  };
  
  dimensions: string;
  material: string;
  image: string;
  featured?: boolean;
}

// Sidebar aur Topbar ke categories data ko update karne ki zarurat nahi hai, ye pehle jesa hi perfect hai
export const categories = [
  { id: 'all', name: 'All Products', icon: 'Grid3X3' },
  { id: 'construction', name: 'Construction', icon: 'Building2' },
  { id: 'gardening', name: 'Gardening', icon: 'Flower2' },
] as const;

export const subcategories = {
  construction: ['Roshan Daan', 'Boundary Pillars', 'Sand'],
  gardening: ['Farming Pots', 'Designer Pots'],
};
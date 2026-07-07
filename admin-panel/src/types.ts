// src/types.ts
export interface Product {
  id: string;
  name: string;
  category: 'construction' | 'gardening';
  subcategory: string;
  price: number | null;
  stock: number; // Ye nayi line add karni hai
  description: string;
  dimensions: string;
  material: string;
  image: string;
  featured?: boolean;
}
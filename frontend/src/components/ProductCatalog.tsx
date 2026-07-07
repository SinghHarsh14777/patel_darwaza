import { useState, useEffect } from 'react';
import { Grid3X3, Building2, Flower2, Loader2 } from 'lucide-react';
import { categories, Category, Product } from '@/data/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next'; // 👇 Hook import kiya

const iconMap = {
  Grid3X3,
  Building2,
  Flower2,
};

const ProductCatalog = () => {
  const { t } = useTranslation(); // 👇 Hook initialize kiya
  
  const [activeCategory, setActiveCategory] = useState<'all' | Category>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // New states for backend data
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from your backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Replace this URL with your actual backend endpoint
        const response = await fetch('https://patel-darwaza.onrender.com/api/products'); 
        
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const getCategoryIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap];
    return Icon ? <Icon className="w-5 h-5" /> : null;
  };

  return (
    <section id="catalog" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium mb-2 block">
            {t('catalog_subtitle')} {/* 👇 Update */}
          </span>
          <h2 className="section-heading mb-4">
            {t('catalog_title')} {/* 👇 Update */}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('catalog_desc')} {/* 👇 Update */}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id as 'all' | Category)}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              className={`gap-2 transition-all ${
                activeCategory === category.id 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'border-border hover:border-primary hover:text-primary'
              }`}
            >
              {getCategoryIcon(category.icon)}
              {/* 👇 Category name ko translate karne ke liye (Aapko exact English name key me dalna hoga) */}
              {t(category.name)} 
            </Button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">
              {t('catalog_loading')} {/* 👇 Update */}
            </span>
          </div>
        )}

        {/* Error State */}
        {error && (
           <div className="text-center py-16 text-red-500">
             <p>{t('catalog_error')} {error}</p> {/* 👇 Update */}
             <Button onClick={() => window.location.reload()} variant="outline" className="mt-4">
               {t('catalog_try_again')} {/* 👇 Update */}
             </Button>
           </div>
        )}

        {/* Product Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div 
                key={product._id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard 
                  product={product} 
                  onViewDetails={setSelectedProduct}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              {t('catalog_empty')} {/* 👇 Update */}
            </p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
};

export default ProductCatalog;

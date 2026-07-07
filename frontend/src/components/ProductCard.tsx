import { Eye, AlertCircle } from 'lucide-react';
import { Product } from '@/data/products'; 
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const { t, i18n } = useTranslation();
  
  // 👇 Current language प्राप्त करें (fallback 'en' के साथ)
  const currentLang = (i18n.language || 'en') as 'en' | 'hi';
  
  // 👇 डेटाबेस से सही भाषा का डेटा निकालें
  const productName = product.name[currentLang] || product.name.en;
  const productDesc = product.description[currentLang] || product.description.en;

  const isOutOfStock = product.stock === 0;

  return (
    <div className={`group card-product bg-card border border-border transition-all relative ${
      isOutOfStock ? 'opacity-75 hover:opacity-90' : ''
    }`}>
      
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={productName}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isOutOfStock ? 'grayscale-[30%]' : 'group-hover:scale-110'
          }`}
        />
        
        <Badge 
          className={`absolute top-3 left-3 z-10 ${
            product.category === 'construction' 
              ? 'bg-primary/90 text-primary-foreground' 
              : 'bg-accent/90 text-accent-foreground'
          }`}
        >
          {/* अगर subcategory भी DB में multilingual है, तो उसे भी product.subcategory[currentLang] कर दें */}
          {product.subcategory}
        </Badge>
        
        {product.featured && !isOutOfStock && (
          <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground z-10">
            {t('prod_featured')}
          </Badge>
        )}

        {isOutOfStock ? (
          <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground font-bold shadow-md z-10 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {t('prod_out_of_stock')}
          </Badge>
        ) : product.stock <= 5 ? (
          <Badge className="absolute top-3 right-3 bg-amber-500 text-white font-semibold shadow-md z-10 animate-pulse">
            {t('prod_low_stock', { count: product.stock })} 
          </Badge>
        ) : null}
        
        {!isOutOfStock && (
          <div className="absolute inset-0 bg-gradient-to-t from-earth/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
        )}
      </div>
      
      {/* Content Area */}
      <div className="p-4 md:p-5 flex flex-col justify-between flex-1">
        <div>
          {/* 👇 यहाँ अपडेटेड नाम दिखाएं */}
          <h3 className="font-display text-xl tracking-wide text-foreground mb-2 line-clamp-2">
            {productName}
          </h3>
          
          {/* 👇 यहाँ अपडेटेड डिस्क्रिप्शन दिखाएं */}
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {productDesc}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div>
            {product.price ? (
              <span className={`font-display text-2xl ${isOutOfStock ? 'text-muted-foreground line-through text-lg' : 'text-primary'}`}>
                ₹{product.price}
              </span>
            ) : (
              <span className="text-accent font-medium">
                {t('prod_ask_price')}
              </span>
            )}
          </div>
          
          <Button 
            onClick={() => onViewDetails(product)}
            variant={isOutOfStock ? "secondary" : "outline"}
            size="sm"
            className={`gap-2 transition-all ${
              isOutOfStock 
                ? 'border-gray-300 text-muted-foreground bg-gray-100 cursor-not-allowed' 
                : 'border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground'
            }`}
            disabled={isOutOfStock}
          >
            <Eye className="w-4 h-4" />
            {isOutOfStock ? t('prod_unavailable') : t('prod_view')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
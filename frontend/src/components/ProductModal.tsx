import { useState } from 'react';
import { X, Ruler, Package, MessageCircle, AlertCircle, CheckCircle2, ZoomIn } from 'lucide-react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const { t, i18n } = useTranslation();
  // 👇 Image zoom ke liye naya state
  const [showFullImage, setShowFullImage] = useState(false);

  if (!product) return null;

  // Current language
  const currentLang = (i18n.language || 'en') as 'en' | 'hi';
  
  // Database se sahi bhasha ka data
  const productName = product.name[currentLang] || product.name.en;
  const productDesc = product.description[currentLang] || product.description.en;

  const isOutOfStock = product.stock === 0;

  const handleWhatsAppInquiry = () => {
    if (isOutOfStock) return;
    
    const messageText = t('modal_whatsapp_template', {
      name: productName,
      dimensions: product.dimensions
    });
    
    const message = encodeURIComponent(messageText);
    window.open(`https://wa.me/9621000683?text=${message}`, '_blank');
  };

  return (
    <>
      {/* MAIN PRODUCT MODAL */}
      <Dialog open={!!product} onOpenChange={() => onClose()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 bg-card border-border">
          <div className="grid md:grid-cols-2">
            {/* Image Section (Ab clickable hai) */}
            <div 
              className="relative aspect-square md:aspect-auto bg-muted group cursor-pointer overflow-hidden"
              onClick={() => setShowFullImage(true)}
            >
              <img
                src={product.image}
                alt={productName}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Hover karne par Zoom icon dikhega */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-black/50 p-3 rounded-full text-white backdrop-blur-sm">
                  <ZoomIn size={24} />
                </div>
              </div>

              <Badge 
                className={`absolute top-4 left-4 ${
                  isOutOfStock ? 'bg-destructive' : 'bg-green-600'
                }`}
              >
                {isOutOfStock ? t('modal_out_of_stock') : t('modal_in_stock', { count: product.stock })}
              </Badge>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8">
              <DialogHeader className="text-left mb-6">
                <DialogTitle className="font-display text-2xl md:text-3xl tracking-wide text-foreground">
                  {productName}
                </DialogTitle>
              </DialogHeader>

              {/* Price */}
              <div className="mb-6">
                {product.price ? (
                  <span className="font-display text-4xl text-primary">₹{product.price}</span>
                ) : (
                  <span className="text-xl text-accent font-semibold">
                    {t('modal_contact_pricing')}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {productDesc}
              </p>

              {/* Specifications */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Ruler className="w-5 h-5 text-primary" />
                  <div>
                    <span className="text-xs text-muted-foreground block">
                      {t('modal_dimensions')}
                    </span>
                    <span className="text-foreground font-medium">{product.dimensions}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Package className="w-5 h-5 text-primary" />
                  <div>
                    <span className="text-xs text-muted-foreground block">
                      {t('modal_material')}
                    </span>
                    <span className="text-foreground font-medium">{product.material}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleWhatsAppInquiry}
                  disabled={isOutOfStock}
                  className={`w-full gap-2 ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent hover:bg-accent/90 text-accent-foreground'}`}
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  {isOutOfStock ? t('modal_btn_unavailable') : t('modal_btn_whatsapp')} 
                </Button>
              </div>
              
              {isOutOfStock && (
                <p className="text-xs text-destructive text-center mt-4 flex items-center justify-center gap-1">
                  <AlertCircle size={14} /> 
                  {t('modal_msg_out_of_stock')}
                </p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* FULL SCREEN IMAGE VIEWER DIALOG */}
      <Dialog open={showFullImage} onOpenChange={setShowFullImage}>
        <DialogContent className="max-w-screen-lg border-none bg-transparent shadow-none p-0 flex justify-center items-center">
          <DialogHeader className="sr-only">
            {/* Screen readers ke liye title zaroori hota hai shadcn mein */}
            <DialogTitle>Image Preview</DialogTitle> 
          </DialogHeader>
          <div className="relative">
            <img 
              src={product.image} 
              alt={productName} 
              className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl" 
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductModal;

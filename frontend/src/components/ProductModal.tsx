import { X, Ruler, Package, MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
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

  if (!product) return null;

  // 👇 Current language प्राप्त करें
  const currentLang = (i18n.language || 'en') as 'en' | 'hi';
  
  // 👇 डेटाबेस से सही भाषा का डेटा निकालें
  const productName = product.name[currentLang] || product.name.en;
  const productDesc = product.description[currentLang] || product.description.en;

  const isOutOfStock = product.stock === 0;

  const handleWhatsAppInquiry = () => {
    if (isOutOfStock) return;
    
    // 👇 WhatsApp मैसेज में सही भाषा वाला नाम जाएगा
    const messageText = t('modal_whatsapp_template', {
      name: productName,
      dimensions: product.dimensions
    });
    
    const message = encodeURIComponent(messageText);
    window.open(`https://wa.me/9621000683?text=${message}`, '_blank');
  };

  return (
    <Dialog open={!!product} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 bg-card border-border">
        <div className="grid md:grid-cols-2">
          {/* Image Section */}
          <div className="relative aspect-square md:aspect-auto bg-muted">
            <img
              src={product.image}
              alt={productName}
              className="w-full h-full object-cover"
            />
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
                {productName} {/* 👇 अपडेटेड नाम */}
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
              {productDesc} {/* 👇 अपडेटेड डिस्क्रिप्शन */}
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
  );
};

export default ProductModal;
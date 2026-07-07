import { useState, useMemo } from 'react'; // 👇 useMemo import kiya
import { Send, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useTranslation } from 'react-i18next'; // 👇 Hook import kiya

const ContactForm = () => {
  const { t } = useTranslation(); // 👇 Hook initialize kiya
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 👇 Schema ko useMemo me wrap kiya taaki translations error messages me kaam karein
  const contactSchema = useMemo(() => z.object({
    name: z.string().trim().min(1, t('err_name_req')).max(100, t('err_name_long')),
    phone: z.string().trim().min(10, t('err_phone_req')).max(15, t('err_phone_long')),
    message: z.string().trim().min(1, t('err_msg_req')).max(1000, t('err_msg_long')),
  }), [t]);

  // WhatsApp Logic (Direct Bypass)
  const handleWhatsAppSubmit = () => {
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => { 
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message; 
      });
      setErrors(fieldErrors);
      return;
    }
    
    setErrors({});
    
    // 👇 WhatsApp message template with translations
    const messageText = t('contact_wa_template', {
      name: formData.name,
      phone: formData.phone,
      message: formData.message
    });
    const message = encodeURIComponent(messageText);
    const phoneNumber = "919621000683";6
    
    // Mobile vs Desktop detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const url = isMobile 
      ? `whatsapp://send?phone=${phoneNumber}&text=${message}` 
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(url, '_blank');
    
    toast({ 
      title: t('toast_wa_title'), 
      description: t('toast_wa_desc') 
    });
    setFormData({ name: '', phone: '', message: '' });
  };

  const handleEmailSubmit = () => {
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => { 
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message; 
      });
      setErrors(fieldErrors);
      return;
    }

    const subject = encodeURIComponent('Quote Request from Website');
    const body = encodeURIComponent(`Name: ${formData.name}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`);
    window.open(`mailto:krishisaathi@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-earth text-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Info Section */}
          <div>
            <span className="text-accent font-medium mb-2 block">
              {t('contact_get_in_touch')}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wider mb-6">
              {t('contact_title')}
            </h2>
            <p className="text-secondary/70 text-lg mb-10 leading-relaxed">
              {t('contact_desc')}
            </p>
            
            <div className="space-y-6">
              <ContactItem icon={<Phone />} title={t('contact_call_us')} value="+91 9621000683" />
              <ContactItem icon={<Mail />} title={t('contact_email')} value="krishisaathi@gmail.com" />
              <ContactItem icon={<MapPin />} title={t('contact_location')} value={t('contact_loc_value')} />
            </div>
          </div>

          {/* Form */}
          <div className="bg-card rounded-2xl p-6 md:p-8 text-foreground">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <Input 
                placeholder={t('contact_ph_name')} 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                className="bg-background h-12" 
              />
              {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
              
              <Input 
                placeholder={t('contact_ph_phone')} 
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                className="bg-background h-12" 
              />
              {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
              
              <Textarea 
                placeholder={t('contact_ph_msg')} 
                rows={5} 
                value={formData.message} 
                onChange={(e) => setFormData({...formData, message: e.target.value})} 
                className="bg-background resize-none" 
              />
              {errors.message && <p className="text-destructive text-sm">{errors.message}</p>}
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleWhatsAppSubmit} size="lg" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                  <MessageCircle className="w-5 h-5" /> {t('contact_btn_wa')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Sub-component
const ContactItem = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">{icon}</div>
    <div>
      <span className="text-secondary/60 text-sm block">{title}</span>
      <span className="text-secondary font-medium">{value}</span>
    </div>
  </div>
);

export default ContactForm;
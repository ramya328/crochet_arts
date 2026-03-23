import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { 
  Heart, 
  ShoppingBag, 
  Key, 
  Flower2, 
  Sun, 
  Sparkles, 
  Instagram, 
  Mail,
  X,
  ChevronRight,
  Star,
  Gift,
  Palette,
  Scissors,
  ArrowRight
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import './App.css';

// Types
interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  icon: React.ReactNode;
}

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  description: string;
}

// Data
const galleryItems: GalleryItem[] = [
  { id: 1, src: '/images/work1.jpg', title: 'Rose Collection', description: 'Beautiful red rose bouquet with matching scrunchie and bow keychain' },
  { id: 2, src: '/images/work2.jpg', title: 'Work in Progress', description: 'Handcrafting a red scrunchie with love and care' },
  { id: 3, src: '/images/work3.jpg', title: 'Sunny Sunflower', description: 'Cheerful yellow sunflower in a handmade pot' },
  { id: 4, src: '/images/work4.jpg', title: 'Tata Amigurumi', description: 'Adorable heart-shaped character with blue outfit' },
];

const products: Product[] = [
  { id: 1, name: 'Rose Bouquet', description: 'Handcrafted red roses wrapped with love', image: '/images/work1.jpg', category: 'flowers', icon: <Flower2 className="w-5 h-5" /> },
  { id: 2, name: 'Bow Keychain', description: 'Cute red bow keychain for your keys', image: '/images/work1.jpg', category: 'keychains', icon: <Key className="w-5 h-5" /> },
  { id: 3, name: 'Scrunchie', description: 'Soft crochet scrunchie for your hair', image: '/images/work2.jpg', category: 'accessories', icon: <Sparkles className="w-5 h-5" /> },
  { id: 4, name: 'Sunflower Pot', description: 'Bright sunflower in handmade pot', image: '/images/work3.jpg', category: 'flowers', icon: <Sun className="w-5 h-5" /> },
  { id: 5, name: 'Tata Character', description: 'Adorable amigurumi character', image: '/images/work4.jpg', category: 'amigurumi', icon: <Heart className="w-5 h-5" /> },
  { id: 6, name: 'Custom Order', description: 'Request your own custom design', image: '/images/work1.jpg', category: 'custom', icon: <Palette className="w-5 h-5" /> },
];

const categories = [
  { name: 'Amigurumi', icon: <Heart className="w-6 h-6" />, count: 'Cute characters' },
  { name: 'Flowers', icon: <Flower2 className="w-6 h-6" />, count: 'Roses & more' },
  { name: 'Keychains', icon: <Key className="w-6 h-6" />, count: 'Bows & charms' },
  { name: 'Accessories', icon: <Sparkles className="w-6 h-6" />, count: 'Scrunchies' },
];

// Animations
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

function App() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (href) {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-crochet-pattern overflow-x-hidden">

      {/* Shop Section Button FIX */}
      {/* Replace MessageCircle with Mail everywhere */}

      {/* SHOP BUTTON */}
      {/* Already handled below */}

      {/* CONTACT SECTION */}
      <section id="contact" className="section-padding relative">
        <div className="container-custom">
          <motion.div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-[3rem] p-8 md:p-16 text-center text-white">

              <h2 className="text-4xl font-bold mb-4">Let&apos;s Create Something Beautiful!</h2>

              <motion.div className="flex flex-wrap justify-center gap-4">
                {[
                  { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
                  { icon: <Mail className="w-5 h-5" />, label: 'Email', color: 'bg-blue-500' },
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    className={`px-6 py-3 ${item.color} rounded-full text-white flex items-center gap-2`}
                  >
                    {item.icon}
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-rose-100">
        <div className="container-custom py-12">
          <div className="flex justify-center gap-6">
            <Instagram className="w-6 h-6" />
            <Mail className="w-6 h-6" />
          </div>
        </div>
      </footer>

      {/* MODAL BUTTON FIX */}
      <Button>
        <Mail className="w-5 h-5 mr-2" />
        Inquire
      </Button>

    </div>
  );
}

export default App;

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

// Animations
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function App() {
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

      {/* CONTACT SECTION */}
      <section id="contact" className="section-padding relative">
        <div className="container-custom">
          <motion.div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-[3rem] p-8 md:p-16 text-center text-white">

              <h2 className="text-4xl font-bold mb-4">
                Let&apos;s Create Something Beautiful!
              </h2>

              <p className="text-white/80 mb-6">
                Reach out through Instagram or Email
              </p>

              <motion.div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="https://instagram.com/_crochet_arts_"
                  target="_blank"
                  className="px-6 py-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-white flex items-center gap-2"
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </motion.a>

                <motion.a
                  href="mailto:"
                  className="px-6 py-3 bg-blue-500 rounded-full text-white flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Email
                </motion.a>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-rose-100">
        <div className="container-custom py-12 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <Instagram className="w-6 h-6 text-gray-500 hover:text-rose-500" />
            <Mail className="w-6 h-6 text-gray-500 hover:text-rose-500" />
          </div>
          <p className="text-gray-500 text-sm">
            Made with ❤️ by Ramya
          </p>
        </div>
      </footer>

      {/* BUTTON */}
      <div className="fixed bottom-6 right-6">
        <Button onClick={() => setIsContactOpen(true)}>
          <Mail className="w-5 h-5 mr-2" />
          Inquire
        </Button>
      </div>

      {/* CONTACT MODAL */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <a href="https://instagram.com/_crochet_arts_" target="_blank" className="flex gap-2">
              <Instagram /> Instagram
            </a>

            <a href="mailto:" className="flex gap-2">
              <Mail /> Email
            </a>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default App;

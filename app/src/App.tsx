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

/* ---------------- DATA (same as your original) ---------------- */

const galleryItems = [
  { id: 1, src: 'img1', title: 'Rose Collection', description: 'Beautiful handmade' },
  { id: 2, src: 'img2', title: 'Work in Progress', description: 'Handcrafting' },
];

const products = [
  { id: 1, name: 'Rose Bouquet', description: 'Handcrafted', image: 'img1', category: 'flowers' },
];

const categories = [
  { name: 'Amigurumi' },
  { name: 'Flowers' },
];

/* ---------------- APP ---------------- */

function App() {
  const [selectedImage, setSelectedImage] = useState<any>(null);
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
          const target = document.querySelector(href);
          target?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen">

      {/* HEADER */}
      <header className="p-4 flex justify-between">
        <h1>Ramya's Corner</h1>
        <button onClick={() => setIsContactOpen(true)}>Order</button>
      </header>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4">
            <h3>{p.name}</h3>
            <p>{p.description}</p>

            {/* UPDATED BUTTON */}
            <button onClick={() => setIsContactOpen(true)}>
              <Mail className="w-4 h-4 inline mr-2" />
              Inquire
            </button>
          </div>
        ))}
      </div>

      {/* CONTACT SECTION */}
      <div className="p-6 flex gap-4 justify-center">
        <a href="https://instagram.com/_crochet_arts_" target="_blank">
          <Instagram className="w-6 h-6" />
        </a>

        <a href="mailto:your@email.com">
          <Mail className="w-6 h-6" />
        </a>
      </div>

      {/* IMAGE MODAL */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
          </DialogHeader>

          <Button onClick={() => setIsContactOpen(true)}>
            <Mail className="w-5 h-5 mr-2" />
            Inquire About This
          </Button>
        </DialogContent>
      </Dialog>

      {/* CONTACT MODAL */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent>

          <DialogHeader>
            <DialogTitle>Get in Touch</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">

            {/* INSTAGRAM */}
            <a
              href="https://instagram.com/_crochet_arts_"
              target="_blank"
              className="flex items-center gap-4"
            >
              <Instagram className="w-6 h-6" />
              Instagram
            </a>

            {/* EMAIL */}
            <a
              href="mailto:your@email.com"
              className="flex items-center gap-4"
            >
              <Mail className="w-6 h-6" />
              Email
            </a>

          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default App;

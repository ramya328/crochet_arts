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

/* ---- SAME DATA (no changes) ---- */

/* ---- YOUR EXISTING DATA ARRAYS HERE (galleryItems, products, categories) ---- */

/* ---- ANIMATIONS SAME ---- */

/* ---- MAIN APP ---- */

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const heroRef = useRef(null);
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
    <div className="min-h-screen bg-crochet-pattern overflow-x-hidden">

      {/* HEADER */}
      {/* (No changes here) */}

      {/* SHOP BUTTON CHANGE */}
      {/* Changed MessageCircle → Mail */}
      <motion.button
        onClick={() => setIsContactOpen(true)}
        className="w-full px-4 py-3 bg-rose-500 text-white rounded-full text-sm font-semibold hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
      >
        <Mail className="w-4 h-4" />
        Inquire Now
      </motion.button>

      {/* CONTACT SECTION */}
      {/* WhatsApp REMOVED */}
      <motion.div className="flex flex-wrap justify-center gap-4">
        <motion.button className="px-6 py-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-white flex items-center gap-2">
          <Instagram className="w-5 h-5" />
          Instagram
        </motion.button>

        <motion.button className="px-6 py-3 bg-blue-500 rounded-full text-white flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Email
        </motion.button>
      </motion.div>

      {/* FOOTER */}
      {/* WhatsApp icon REMOVED */}
      <div className="flex items-center gap-6">
        <a href="#">
          <Instagram className="w-6 h-6" />
        </a>
        <a href="#">
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
      {/* WhatsApp COMPLETELY REMOVED */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-center">
              Get in Touch!
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">

            {/* INSTAGRAM */}
            <a
              href="https://instagram.com/_crochet_arts_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center rounded-full">
                <Instagram className="text-white" />
              </div>
              <div>
                <div className="font-semibold">Instagram</div>
                <div className="text-sm text-gray-500">@_crochet_arts_</div>
              </div>
              <ChevronRight className="ml-auto" />
            </a>

            {/* EMAIL */}
            <a
              href="mailto:your@email.com"
              className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50"
            >
              <div className="w-12 h-12 bg-blue-500 flex items-center justify-center rounded-full">
                <Mail className="text-white" />
              </div>
              <div>
                <div className="font-semibold">Email</div>
                <div className="text-sm text-gray-500">Send message</div>
              </div>
              <ChevronRight className="ml-auto" />
            </a>

          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default App;

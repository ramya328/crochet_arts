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
  MessageCircle, 
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
  { 
    id: 1, 
    src: '/images/work1.jpg', 
    title: 'Rose Collection', 
    description: 'Beautiful red rose bouquet with matching scrunchie and bow keychain' 
  },
  { 
    id: 2, 
    src: '/images/work2.jpg', 
    title: 'Work in Progress', 
    description: 'Handcrafting a red scrunchie with love and care' 
  },
  { 
    id: 3, 
    src: '/images/work3.jpg', 
    title: 'Sunny Sunflower', 
    description: 'Cheerful yellow sunflower in a handmade pot' 
  },
  { 
    id: 4, 
    src: '/images/work4.jpg', 
    title: 'Tata Amigurumi', 
    description: 'Adorable heart-shaped character with blue outfit' 
  },
];

const products: Product[] = [
  { 
    id: 1, 
    name: 'Rose Bouquet', 
    description: 'Handcrafted red roses wrapped with love', 
    image: '/images/work1.jpg',
    category: 'flowers',
    icon: <Flower2 className="w-5 h-5" />
  },
  { 
    id: 2, 
    name: 'Bow Keychain', 
    description: 'Cute red bow keychain for your keys', 
    image: '/images/work1.jpg',
    category: 'keychains',
    icon: <Key className="w-5 h-5" />
  },
  { 
    id: 3, 
    name: 'Scrunchie', 
    description: 'Soft crochet scrunchie for your hair', 
    image: '/images/work2.jpg',
    category: 'accessories',
    icon: <Sparkles className="w-5 h-5" />
  },
  { 
    id: 4, 
    name: 'Sunflower Pot', 
    description: 'Bright sunflower in handmade pot', 
    image: '/images/work3.jpg',
    category: 'flowers',
    icon: <Sun className="w-5 h-5" />
  },
  { 
    id: 5, 
    name: 'Tata Character', 
    description: 'Adorable amigurumi character', 
    image: '/images/work4.jpg',
    category: 'amigurumi',
    icon: <Heart className="w-5 h-5" />
  },
  { 
    id: 6, 
    name: 'Custom Order', 
    description: 'Request your own custom design', 
    image: '/images/work1.jpg',
    category: 'custom',
    icon: <Palette className="w-5 h-5" />
  },
];

const categories = [
  { name: 'Amigurumi', icon: <Heart className="w-6 h-6" />, count: 'Cute characters' },
  { name: 'Flowers', icon: <Flower2 className="w-6 h-6" />, count: 'Roses & more' },
  { name: 'Keychains', icon: <Key className="w-6 h-6" />, count: 'Bows & charms' },
  { name: 'Accessories', icon: <Sparkles className="w-6 h-6" />, count: 'Scrunchies' },
];

// Animation variants
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
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
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
          const target = document.querySelector(href);
          target?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-crochet-pattern overflow-x-hidden">
      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-rose-200/30 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/3 right-20 w-40 h-40 rounded-full bg-amber-200/30 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full bg-purple-200/20 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-rose-100/50"
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/30">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-display text-xl md:text-2xl font-bold text-gray-800">
                Ramya&apos;s Corner
              </span>
            </motion.div>
            
            <nav className="hidden md:flex items-center gap-8">
              {['Home', 'Gallery', 'Shop', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-rose-500 font-medium transition-colors relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all group-hover:w-full" />
                </motion.a>
              ))}
            </nav>

            <motion.button
              onClick={() => setIsContactOpen(true)}
              className="btn-primary text-sm py-2 px-4 md:py-3 md:px-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="hidden md:inline">Order Now</span>
              <ShoppingBag className="w-5 h-5 md:hidden" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center pt-20">
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-600 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Handmade with Love</span>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 leading-tight mb-6"
              >
                Welcome to{' '}
                <span className="text-gradient">Ramya&apos;s</span>{' '}
                Crochet Corner
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
              >
                Discover beautiful handmade crochet creations - from adorable amigurumi 
                to elegant flowers and charming accessories. Each piece is crafted with 
                love and attention to detail.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.a
                  href="#shop"
                  className="btn-primary flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Shop Collection
                </motion.a>
                <motion.a
                  href="#gallery"
                  className="px-8 py-4 bg-white text-rose-500 font-semibold rounded-full shadow-lg border-2 border-rose-200 hover:border-rose-400 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Palette className="w-5 h-5" />
                  View My Work
                </motion.a>
              </motion.div>
              
              {/* Stats */}
              <motion.div 
                variants={fadeInUp}
                className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12"
              >
                {[
                  { value: '100+', label: 'Happy Customers' },
                  { value: '50+', label: 'Unique Designs' },
                  { value: '4.9', label: 'Rating' },
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <div className="font-display text-3xl md:text-4xl font-bold text-rose-500">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Hero Images */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative"
            >
              <motion.div 
                variants={scaleIn}
                className="relative z-10"
              >
                <motion.div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl shadow-rose-500/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="/images/work1.jpg" 
                    alt="Ramya's Crochet Work" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-500/20 to-transparent" />
                </motion.div>
                
                {/* Floating Badge */}
                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Made with Love</div>
                      <div className="text-sm text-gray-500">Every stitch counts</div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating Image */}
                <motion.div 
                  className="absolute -top-8 -right-8 w-32 h-32 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
                  animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img 
                    src="/images/work4.jpg" 
                    alt="Tata Character" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
              
              {/* Decorative Elements */}
              <motion.div 
                className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 opacity-50 blur-2xl"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 20, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-rose-300 flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-rose-500"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="section-padding relative">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mb-4">
              <Scissors className="w-4 h-4" />
              <span>What I Create</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Explore My <span className="text-gradient">Creations</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto">
              From cute amigurumi characters to beautiful flowers and practical accessories
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-rose-100/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center mb-6 text-rose-500 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                  >
                    {category.icon}
                  </motion.div>
                  <h3 className="font-display text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                  <p className="text-gray-500 text-sm">{category.count}</p>
                </div>
                <motion.div 
                  className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-rose-100/30 blur-2xl group-hover:scale-150 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section-padding relative">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              <span>My Portfolio</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Featured <span className="text-gradient">Works</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto">
              Click on any image to see it in full detail
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                whileHover={{ scale: 1.02 }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-[4/3] overflow-hidden">
                    <motion.img 
                      src={item.src} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <h3 className="font-display text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.description}</p>
                  </motion.div>
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-5 h-5 text-rose-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="section-padding relative bg-gradient-to-b from-rose-50/50 to-transparent">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-600 text-sm font-medium mb-4">
              <Gift className="w-4 h-4" />
              <span>Available Now</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Shop <span className="text-gradient">Collection</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 max-w-2xl mx-auto">
              Beautiful handmade pieces ready to be yours
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-rose-100/50"
              >
                <div className="relative aspect-square overflow-hidden">
                  <motion.img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 text-rose-500 text-xs font-semibold flex items-center gap-1">
                      {product.icon}
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{product.description}</p>
                  <motion.button
                    onClick={() => setIsContactOpen(true)}
                    className="w-full px-4 py-3 bg-rose-500 text-white rounded-full text-sm font-semibold hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Inquire Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding relative">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
              {/* Decorative Elements */}
              <motion.div 
                className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/10 blur-3xl"
                animate={{ x: [-50, 50, -50], y: [-50, 50, -50] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl"
                animate={{ x: [50, -50, 50], y: [50, -50, 50] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              
              <motion.div variants={fadeInUp} className="relative z-10">
                <motion.div 
                  className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-8"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-10 h-10 text-white fill-white" />
                </motion.div>
                
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Let&apos;s Create Something Beautiful!
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                  Have a custom design in mind? Want to place an order? 
                  Reach out to me on any of these platforms!
                </p>
                
                <motion.div 
                  variants={staggerContainer}
                  className="flex flex-wrap justify-center gap-4"
                >
                  {[
                    { icon: <MessageCircle className="w-5 h-5" />, label: 'WhatsApp', color: 'bg-green-500' },
                    { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
                    { icon: <Mail className="w-5 h-5" />, label: 'Email', color: 'bg-blue-500' },
                  ].map((item, index) => (
                    <motion.button
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 ${item.color} rounded-full text-white font-semibold flex items-center gap-2 shadow-lg`}
                    >
                      {item.icon}
                      {item.label}
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-rose-100">
        <div className="container-custom py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-display text-xl font-bold text-gray-800">
                Ramya&apos;s Corner
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <motion.a 
                href="#" 
                className="text-gray-500 hover:text-rose-500 transition-colors"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-500 hover:text-rose-500 transition-colors"
                whileHover={{ scale: 1.2, rotate: -10 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-500 hover:text-rose-500 transition-colors"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <Mail className="w-6 h-6" />
              </motion.a>
            </div>
            
            <p className="text-gray-500 text-sm">
              Made with <Heart className="w-4 h-4 inline text-rose-500 fill-rose-500 animate-heartbeat" /> by Ramya
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white rounded-3xl">
          <DialogHeader className="absolute top-4 right-4 z-10">
            <button 
              onClick={() => setSelectedImage(null)}
              className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </DialogHeader>
          {selectedImage && (
            <div className="grid md:grid-cols-2">
              <div className="aspect-square">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <DialogTitle className="font-display text-2xl font-bold text-gray-800 mb-4">
                  {selectedImage.title}
                </DialogTitle>
                <p className="text-gray-600 mb-6">{selectedImage.description}</p>
                <Button 
                  onClick={() => setIsContactOpen(true)}
                  className="btn-primary w-full"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Inquire About This
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Modal */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold text-center text-gray-800">
              Get in Touch!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-center text-gray-600">
              Choose your preferred way to connect with me
            </p>
           
            <motion.a
              href="https://instagram.com/_crochet_arts_"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-800">Instagram</div>
                <div className="text-sm text-gray-500">@_crochet_arts_</div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
            </motion.a>
            <motion.a
              href="mailto:"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-800">Email</div>
                <div className="text-sm text-gray-500">For detailed inquiries</div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
            </motion.a>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;

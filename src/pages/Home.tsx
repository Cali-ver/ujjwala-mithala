import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import PaintingCard from '../components/ui/PaintingCard';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const curatedPaintings = [
    {
      id: '1',
      title: 'The Eternal Vriksha',
      artist: 'Smt. Devi Kumari',
      price: 14500,
      image: '/images/vriksha.png',
      size: '24 x 36 inches',
      category: 'Nature',
    },
    {
      id: '2',
      title: 'Divine Flutist',
      artist: 'Shri Rakesh Jha',
      price: 18200,
      image: '/images/flutist.png',
      size: '30 x 40 inches',
      category: 'Mythology',
    },
    {
      id: '4',
      title: 'Sacred Matsya Pair',
      artist: 'Shri Pawan Mandal',
      price: 7500,
      image: '/images/matsya.png',
      size: '12 x 18 inches',
      category: 'Nature',
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#F5F2EA]"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-heritage-red/10 text-heritage-red text-[10px] font-bold uppercase tracking-widest mb-6 border border-heritage-red/10">
                The Heritage Collective
              </span>
              <h1 className="text-5xl md:text-7xl font-serif text-heritage-dark mb-6 leading-tight">
                Experience the <span className="italic text-heritage-red">Soul</span> <br /> 
                of Mithila Art
              </h1>
              <p className="text-lg opacity-70 mb-10 max-w-lg leading-relaxed">
                Handcrafted traditions, stories, and culture brought to life through vibrant natural pigments and ancient brushstrokes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/gallery" className="btn-primary flex items-center justify-center gap-2 px-8 py-4">
                  Explore Collection <ArrowRight size={18} />
                </Link>
                <Link to="/heritage" className="btn-outline px-8 py-4">
                  About the Craft
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10 bg-white p-4 shadow-2xl border border-white/40 rounded-lg"
            >
              <img 
                src="/images/vriksha.png" 
                alt="Main Hero Art" 
                className="w-full aspect-[4/5] object-cover rounded shadow-inner"
              />
              <div className="absolute -bottom-6 -left-6 bg-heritage-teal text-white p-6 rounded-lg shadow-xl hidden lg:block max-w-[200px]">
                <p className="text-sm italic font-serif leading-relaxed">
                  "Every stroke tells a piece of history preserved across generations."
                </p>
              </div>
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-heritage-red/5 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Curated Gallery Section */}
      <section className="py-24 bg-heritage-cream">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-serif text-heritage-dark mb-4">Curated Gallery</h2>
              <p className="opacity-60 max-w-md">Our handpicked selection of authentic Madhubani paintings, made with organic colors and ancestral precision.</p>
            </div>
            <Link to="/gallery" className="hidden sm:flex items-center gap-2 text-heritage-red font-bold uppercase tracking-widest text-xs border-b border-heritage-red/20 pb-1 hover:border-heritage-red transition-all">
              View All Masterpieces <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {curatedPaintings.map((painting) => (
              <PaintingCard key={painting.id} {...painting} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 grid grid-cols-2 gap-8">
            <div className="p-8 bg-heritage-cream rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-serif text-heritage-red mb-2">2500+</span>
              <span className="text-xs uppercase tracking-widest opacity-60">Pieces Preserved</span>
            </div>
            <div className="p-8 bg-heritage-cream rounded-2xl flex flex-col items-center justify-center text-center translate-y-8">
              <span className="text-4xl font-serif text-heritage-red mb-2">150+</span>
              <span className="text-xs uppercase tracking-widest opacity-60">Master Artisans</span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-serif text-heritage-dark mb-6">Painted by the Soul, Defined by Nature</h2>
            <p className="text-lg opacity-70 mb-8 leading-relaxed">
              Originating from the Mithila region of Bihar, Madhubani art was traditionally practiced by women on freshly plastered mud walls of their homes. Today, these vibrant patterns have moved from walls to canvas, yet the soul remains—using bamboo sticks, twigs, and fingers to create geometry that breathes.
            </p>
            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-heritage-red/10 flex items-center justify-center shrink-0">
                  <Star size={16} className="text-heritage-red" />
                </div>
                <div>
                  <h4 className="font-bold">Natural Pigments</h4>
                  <p className="text-sm opacity-60">Turmeric for yellow, indigo for blue, and kusum flowers for red.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-heritage-red/10 flex items-center justify-center shrink-0">
                  <Star size={16} className="text-heritage-red" />
                </div>
                <div>
                  <h4 className="font-bold">Symbolic Motifs</h4>
                  <p className="text-sm opacity-60">Fish for fertility, peacocks for purity, and bamboo for family.</p>
                </div>
              </div>
            </div>
            <Link to="/heritage" className="underline underline-offset-8 font-serif italic text-lg hover:text-heritage-red transition-all">
              Discover the Cultural Heritage
            </Link>
          </div>
        </div>
      </section>

      {/* Own a Piece CTA */}
      <section className="py-24 container mx-auto px-4 md:px-8">
        <div className="bg-heritage-red rounded-[2rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif mb-8 max-w-3xl mx-auto leading-tight">
              Own a Piece of Ancient Tradition
            </h2>
            <p className="text-lg opacity-80 mb-12 max-w-lg mx-auto leading-relaxed">
              Join our mission to keep this dying art form alive. Every purchase supports an artisan community in Bihar directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/shop" className="bg-white text-heritage-red px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-xl">
                Shop the Collection
              </Link>
              <button className="border-2 border-white/30 px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-heritage-red transition-all">
                Inquire Wholesale
              </button>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;

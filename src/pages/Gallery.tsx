import React, { useState } from 'react';
import { Search } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import PaintingCard from '../components/ui/PaintingCard';

const Gallery: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState('All');
  const [activeSize, setActiveSize] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const paintings = [
    {
      id: '1',
      title: 'The Eternal Vriksha',
      artist: 'Smt. Devi Kumari',
      price: 14500,
      image: '/images/vriksha.png',
      size: '24 x 36 inches',
      category: 'Nature',
      sizeCategory: 'Large',
    },
    {
      id: '2',
      title: 'Divine Flutist',
      artist: 'Shri Rakesh Jha',
      price: 18200,
      image: '/images/flutist.png',
      size: '30 x 40 inches',
      category: 'Mythology',
      sizeCategory: 'Large',
    },
    {
      id: '4',
      title: 'Sacred Matsya Pair',
      artist: 'Shri Pawan Mandal',
      price: 7500,
      image: '/images/matsya.png',
      size: '12 x 18 inches',
      category: 'Nature',
      sizeCategory: 'Small',
    },
    {
      id: '5',
      title: 'The Harvest Festival',
      artist: 'Smt. Anjali Mahto',
      price: 9800,
      image: '/images/flutist.png', // Replacement for now
      size: '18 x 24 inches',
      category: 'Rural Life',
      sizeCategory: 'Medium',
    },
    {
      id: '6',
      title: 'The Royal Swayamvar',
      artist: 'Smt. Radha Devi',
      price: 22000,
      image: '/images/vriksha.png', // Replacement for now
      size: '36 x 48 inches',
      category: 'Mythology',
      sizeCategory: 'Large',
    },
    {
      id: '7',
      title: 'Golden Surya Dev',
      artist: 'Smt. Sharda Devi',
      price: 12400,
      image: '/images/matsya.png', // Replacement for now
      size: '24 x 24 inches',
      category: 'Nature',
      sizeCategory: 'Medium',
    },
  ];

  const themes = ['All', 'Mythology', 'Nature', 'Rural Life'];
  const sizes = ['All', 'Small', 'Medium', 'Large'];

  const filteredPaintings = paintings.filter((p) => {
    const themeMatch = activeTheme === 'All' || p.category === activeTheme;
    const sizeMatch = activeSize === 'All' || p.sizeCategory === activeSize;
    const searchMatch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      p.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return themeMatch && sizeMatch && searchMatch;
  });

  return (
    <MainLayout>
      <section className="bg-heritage-teal pt-32 pb-24 text-white relative overflow-hidden">
        {/* Abstract background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-radial from-white/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-[50%] h-full bg-gradient-radial from-white/10 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-6 inline-block opacity-70">The Living Traditions</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-8 max-w-4xl mx-auto leading-tight">Masterpiece Gallery</h1>
          <div className="w-24 h-[2px] bg-heritage-gold/50 mx-auto mb-8 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-heritage-gold rotate-45 border border-heritage-teal"></div>
          </div>
          <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
            Explore our curated collection of authentic Madhubani paintings, handcrafted by master artisans from the heart of Mithila.
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <div className="sticky top-20 z-40 bg-heritage-cream/80 backdrop-blur-md border-b border-heritage-red/5">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex flex-wrap items-center gap-12">
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Theme</span>
                <div className="flex flex-wrap gap-3">
                  {themes.map((theme) => (
                    <button
                      key={theme}
                      onClick={() => setActiveTheme(theme)}
                      className={`px-6 py-2 rounded-full text-xs font-medium transition-all ${
                        activeTheme === theme 
                        ? 'bg-heritage-red text-white shadow-lg' 
                        : 'bg-white text-heritage-dark/60 hover:bg-white/80'
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Size</span>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setActiveSize(size)}
                      className={`px-6 py-2 rounded-full text-xs font-medium transition-all ${
                        activeSize === size 
                        ? 'bg-heritage-red text-white shadow-lg' 
                        : 'bg-white text-heritage-dark/60 hover:bg-white/80'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative max-w-md w-full">
              <input
                type="text"
                placeholder="Search heritage artworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-heritage-red/5 rounded-full px-12 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-heritage-red/20 transition-all shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-20 bg-heritage-cream min-h-[60vh]">
        <div className="container mx-auto px-4 md:px-8">
          {filteredPaintings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
              {filteredPaintings.map((painting) => (
                <PaintingCard key={painting.id} {...painting} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 opacity-60">
              <Search size={48} className="mb-4" />
              <p className="text-xl font-serif">No masterpieces found matching your filters</p>
              <button 
                onClick={() => { setActiveTheme('All'); setActiveSize('All'); setSearchQuery(''); }}
                className="mt-4 text-heritage-red font-bold uppercase tracking-widest text-xs"
              >
                Clear all filters
              </button>
            </div>
          )}
          
          <div className="mt-24 text-center">
            <button className="px-10 py-4 border-2 border-heritage-red/20 text-heritage-red font-bold uppercase tracking-widest text-xs rounded-full hover:bg-heritage-red hover:text-white transition-all">
              Discover More Pieces
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Gallery;

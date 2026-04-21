import React, { useState } from 'react';
import { ShoppingBag, Filter, ChevronDown } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const Shop: React.FC = () => {
  const { addToCart } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const products = [
    { id: 's1', title: 'The Matsya Runner', category: 'Table Runners', price: 12000, image: '/images/matsya.png', originalPrice: 15000 },
    { id: 's2', title: 'Surya Cushion Cover', category: 'Cushions', price: 1800, image: '/images/pottery.png', originalPrice: 2200 },
    { id: 's3', title: 'Eternal Tree Canvas', category: 'Original Canvas', price: 45000, image: '/images/vriksha.png', originalPrice: 50000 },
    { id: 's4', title: 'Folklore Gift Trio', category: 'Gift Sets', price: 5500, image: '/images/flutist.png', originalPrice: 6500 },
    { id: 's5', title: 'Mayura Ceramic Vase', category: 'Home Decor', price: 3200, image: '/images/pottery.png', originalPrice: 4000 },
    { id: 's6', title: 'Radha-Krishna Mural', category: 'Wall Murals', price: 85000, image: '/images/flutist.png', originalPrice: 100000 },
  ];

  const categories = ['All', 'Wall Murals', 'Table Runners', 'Cushions', 'Gift Sets', 'Original Canvas', 'Home Decor'];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-8 pt-32 pb-20">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-serif text-heritage-dark mb-4">The Marketplace</h1>
          <p className="opacity-60 max-w-2xl leading-relaxed">
            Own a piece of the sun. Every stroke tells a story of the gods, nature, and the rhythmic cycle of life in the Mithila region.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0 space-y-10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <Filter size={14} /> Categories
              </h3>
              <div className="space-y-3">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left text-sm transition-all hover:translate-x-1 ${
                      selectedCategory === cat ? 'text-heritage-red font-bold' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-heritage-red text-white rounded-2xl">
              <h4 className="font-serif text-xl mb-4 leading-tight">Request Custom Commission</h4>
              <p className="text-xs opacity-70 mb-6">Have a specific design or size in mind? Our master artists can create it for you.</p>
              <button className="w-full bg-white text-heritage-red py-3 rounded-full text-xs font-bold uppercase tracking-widest">
                Contact Us
              </button>
            </div>
          </aside>

          {/* Main Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-white mb-6 border border-heritage-red/5">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <button 
                      onClick={() => addToCart({ id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1, category: product.category })}
                      className="absolute bottom-6 left-6 right-6 bg-heritage-red text-white py-4 rounded-full font-bold uppercase tracking-widest text-[10px] transform translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={14} /> Add to Bag
                    </button>
                    {product.originalPrice > product.price && (
                      <span className="absolute top-4 left-4 bg-heritage-gold text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        Limited Edition
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl mb-1">{product.title}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-sm opacity-40">{product.category}</p>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-heritage-red">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm opacity-30 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-20 flex items-center justify-center gap-4">
              <button className="w-10 h-10 rounded-full border border-heritage-red/10 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity">
                <ChevronDown className="rotate-90" size={20} />
              </button>
              <span className="w-10 h-10 rounded-full bg-heritage-red text-white flex items-center justify-center font-bold">1</span>
              <button className="w-10 h-10 rounded-full border border-heritage-red/10 flex items-center justify-center hover:bg-heritage-red/5">2</button>
              <button className="w-10 h-10 rounded-full border border-heritage-red/10 flex items-center justify-center hover:bg-heritage-red/5">3</button>
              <button className="w-10 h-10 rounded-full border border-heritage-red/10 flex items-center justify-center hover:opacity-100 transition-opacity">
                <ChevronDown className="-rotate-90" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Shop;

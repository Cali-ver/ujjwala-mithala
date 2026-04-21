import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

interface PaintingCardProps {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  size: string;
  category: string;
}

const PaintingCard: React.FC<PaintingCardProps> = ({ id, title, artist, price, image, size, category }) => {
  const { addToCart } = useAppContext();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-heritage-dark border border-heritage-red/10">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-serif text-xl text-heritage-dark leading-tight">{title}</h3>
          <span className="font-serif text-heritage-red font-bold">₹{price.toLocaleString()}</span>
        </div>
        <p className="text-xs opacity-60 mb-6">by {artist}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-[10px] opacity-40 uppercase tracking-tighter">{size}</span>
          <button 
            onClick={() => addToCart({ id, title, price, image, quantity: 1, category })}
            className="text-[10px] font-bold uppercase tracking-widest bg-heritage-red text-white px-5 py-2.5 rounded-full hover:bg-heritage-red/90 transition-all active:scale-95"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PaintingCard;

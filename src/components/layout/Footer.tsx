import React from 'react';
import { Mail, Globe, Share2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-heritage-cream pt-20 pb-10 border-t border-heritage-red/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl font-serif text-heritage-red mb-8 tracking-wide">Mithila Heritage</h2>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
            <a href="#" className="text-xs uppercase tracking-widest hover:text-heritage-red transition-colors">The Craft</a>
            <a href="#" className="text-xs uppercase tracking-widest hover:text-heritage-red transition-colors">Our Artists</a>
            <a href="#" className="text-xs uppercase tracking-widest hover:text-heritage-red transition-colors">Shipping</a>
            <a href="#" className="text-xs uppercase tracking-widest hover:text-heritage-red transition-colors">Terms</a>
          </div>

          <div className="flex space-x-6">
            <button className="p-2 rounded-full border border-heritage-red/20 hover:bg-heritage-red/5 transition-colors">
              <Globe size={18} className="text-heritage-red" />
            </button>
            <button className="p-2 rounded-full border border-heritage-red/20 hover:bg-heritage-red/5 transition-colors">
              <Mail size={18} className="text-heritage-red" />
            </button>
            <button className="p-2 rounded-full border border-heritage-red/20 hover:bg-heritage-red/5 transition-colors">
              <Share2 size={18} className="text-heritage-red" />
            </button>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-heritage-red/20 to-transparent mb-8"></div>

        <div className="text-center">
          <p className="text-[10px] md:text-sm opacity-60 max-w-2xl mx-auto leading-relaxed">
            © 2024 Mithila Heritage. Preserving the hand-painted soul of Madhubani. 
            Each purchase supports local artisan communities in Bihar, India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

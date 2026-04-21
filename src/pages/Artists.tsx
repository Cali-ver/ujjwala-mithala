import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { motion } from 'framer-motion';
import { MapPin, Palette, ArrowUpRight } from 'lucide-react';

const Artists: React.FC = () => {
  const artists = [
    {
      name: 'Meera Jha',
      specialty: 'Bharni Specialist',
      bio: "My art is a conversation with my ancestors. I use the concentric circles of the sun to represent the infinite cycle of life.",
      origin: 'Madhubani District',
      image: '/images/vriksha.png', // Replacement for artist photo
      featured: 'Solar Cycle Collection',
      large: true
    },
    {
      name: 'Rajeshwar Thakur',
      specialty: 'Bharni Technique',
      bio: "A third-generation artist who specializes in the vibrant filling technique known as Bharni, focusing on wedding processions.",
      origin: 'Jitwarpur Village',
      image: '/images/flutist.png',
      featured: 'Echoes of Bihar 2022'
    },
    {
      name: 'Sunita Devi',
      specialty: 'Kachni Master',
      bio: "Sunita's work is defined by incredibly fine line work that creates mesmerizing textures without the use of solid color.",
      origin: 'Ranti Village',
      image: '/images/matsya.png',
      featured: 'Whispers of Mithila'
    },
    {
      name: 'Aditi Mishra',
      specialty: 'Contemporary Fusion',
      bio: "Bridging the gap between tradition and modern interiors, Aditi focuses on abstracting Mithila motifs for global living spaces.",
      origin: 'Patna',
      image: '/images/pottery.png',
      featured: 'Modern Roots'
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-8 pt-32 pb-20">
        <div className="flex flex-col md:flex-row gap-12 items-end justify-between mb-24">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-6 inline-block opacity-40">Guardians of the Line</span>
            <h1 className="text-6xl md:text-8xl font-serif text-heritage-red mb-8 leading-tight">The Hands that Paint the Soul</h1>
            <p className="text-lg opacity-70 leading-relaxed">
              In the heart of Mithila, every stroke is a prayer, every color a memory. Meet the artisans who have preserved the Madhubani legacy for over three millennia.
            </p>
          </div>
          <div className="md:w-1/3 italic font-serif text-2xl border-l-2 border-heritage-red/20 pl-8 pb-4">
            "The ink flows like the river Ganga through our fingers."
            <span className="block text-sm font-sans font-bold uppercase mt-4 opacity-40">— Smt. Devi, Master Artisan</span>
          </div>
        </div>

        <section className="space-y-24">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-serif">Meet the Masters</h2>
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-heritage-red/20 px-6 py-3 rounded-full">
              Filter by Style
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {artists.map((artist, idx) => (
              <motion.div 
                key={artist.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-3xl overflow-hidden flex flex-col ${artist.large ? 'md:col-span-2 md:flex-row' : ''} shadow-sm border border-heritage-red/5`}
              >
                <div className={`${artist.large ? 'md:w-1/2' : 'w-full aspect-[4/3]'} relative overflow-hidden bg-heritage-cream`}>
                  <img src={artist.image} alt={artist.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className={`${artist.large ? 'md:w-1/2 p-12 lg:p-16' : 'p-8'} flex flex-col justify-center`}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] font-bold bg-heritage-red/5 px-3 py-1 rounded-full text-heritage-red uppercase tracking-widest">{artist.specialty}</span>
                  </div>
                  <h3 className="text-4xl font-serif mb-6">{artist.name}</h3>
                  <p className="text-lg opacity-60 mb-10 leading-relaxed italic">"{artist.bio}"</p>
                  
                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-3 text-sm">
                      <Palette size={16} className="text-heritage-red opacity-40" />
                      <span className="opacity-60">Featured:</span>
                      <span className="font-bold">{artist.featured}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin size={16} className="text-heritage-red opacity-40" />
                      <span className="opacity-60">Origin:</span>
                      <span className="font-bold">{artist.origin}</span>
                    </div>
                  </div>

                  <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-heritage-red border-b border-heritage-red/20 pb-1 w-fit hover:border-heritage-red transition-all">
                    View Portfolio <ArrowUpRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-32 py-20 bg-heritage-red rounded-[3rem] text-white text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-10">Bring a Legend Home</h2>
          <p className="opacity-80 max-w-lg mx-auto mb-12">Each purchase directly supports our artisans and ensures the Mithila tradition continues for another thousand years.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-heritage-red px-10 py-5 rounded-full font-bold uppercase tracking-widest shadow-xl">Shop Original Paintings</button>
            <button className="border border-white/30 px-10 py-5 rounded-full font-bold uppercase tracking-widest">Commission a Piece</button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Artists;

import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen, totalPrice } = useAppContext();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-heritage-cream z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 flex items-center justify-between border-b border-heritage-red/10">
              <h2 className="text-xl font-serif text-heritage-red flex items-center gap-2">
                <ShoppingBag size={20} />
                Your Bag
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-heritage-red/5 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full opacity-40">
                  <ShoppingBag size={64} className="mb-4" />
                  <p className="text-lg">Your bag is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-white rounded-lg overflow-hidden border border-heritage-red/5">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-lg">{item.title}</h3>
                      <p className="text-sm opacity-60 mb-2">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">₹{item.price.toLocaleString()}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">Qty: {item.quantity}</span>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-heritage-red opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-heritage-red/10 bg-white/50 space-y-4">
                <div className="flex items-center justify-between text-lg font-medium">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <p className="text-xs opacity-60 text-center">Shipping and taxes calculated at checkout</p>
                <button className="w-full btn-primary py-4 text-lg">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Truck, ArrowLeft, ShieldCheck, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { checkout } from '../services/orderService';

type PaymentMethod = 'card' | 'upi' | 'cod';

const Checkout: React.FC = () => {
  const { cart, totalPrice, clearCart } = useAppContext();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to place an order.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    setIsProcessing(true);
    setError(null);
    
    try {
      const orderData = {
        paymentMethod,
        items: cart.map(item => ({
          productId: item.id,
          productName: item.title,
          quantity: item.quantity,
          price: item.price
        }))
      };

      await checkout(orderData);
      
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 3000);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
      setIsProcessing(false);
    }
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen bg-heritage-cream flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-serif text-heritage-dark mb-4">Your bag is empty</h2>
        <Link to="/shop" className="btn-primary">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-heritage-cream py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-heritage-dark/60 hover:text-heritage-red transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>Back to Shop</span>
          </button>
          <h1 className="text-3xl font-serif text-heritage-dark">Secure Checkout</h1>
          <div className="flex items-center text-green-600 text-sm font-medium">
            <ShieldCheck size={18} className="mr-1" />
            <span>Encrypted Payment</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl mb-8 flex items-center shadow-sm">
            <div className="w-2 h-2 bg-red-600 rounded-full mr-3 animate-pulse"></div>
            {error}
          </div>
        )}

        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-12 text-center shadow-xl border border-heritage-red/10 max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-3xl font-serif text-heritage-dark mb-4">Order Placed Successfully!</h2>
            <p className="text-heritage-dark/60 mb-8">
              Thank you for supporting Mithila art. We've sent a confirmation email to your registered address.
            </p>
            <div className="animate-pulse text-heritage-red font-medium">
              Redirecting you home...
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Shipping & Payment */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Address Mock */}
              <section className="bg-white/50 backdrop-blur-md rounded-3xl p-8 border border-heritage-red/5 shadow-sm">
                <h3 className="text-xl font-serif mb-6 flex items-center">
                  <span className="w-8 h-8 bg-heritage-red text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                  Shipping Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-heritage-dark/60 uppercase ml-1">Full Name</label>
                    <input type="text" placeholder="Vivek Kumar" className="w-full bg-white border border-heritage-red/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-heritage-red/20 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-heritage-dark/60 uppercase ml-1">Phone Number</label>
                    <input type="text" placeholder="+91 98765 43210" className="w-full bg-white border border-heritage-red/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-heritage-red/20 outline-none" />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-heritage-dark/60 uppercase ml-1">Street Address</label>
                    <input type="text" placeholder="123 Heritage Lane, Mithila Region" className="w-full bg-white border border-heritage-red/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-heritage-red/20 outline-none" />
                  </div>
                </div>
              </section>

              {/* Payment Method */}
              <section className="bg-white/50 backdrop-blur-md rounded-3xl p-8 border border-heritage-red/5 shadow-sm">
                <h3 className="text-xl font-serif mb-6 flex items-center">
                  <span className="w-8 h-8 bg-heritage-red text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                  Payment Method
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
                      paymentMethod === 'card' ? 'border-heritage-red bg-heritage-red/5' : 'border-heritage-red/5 bg-white hover:border-heritage-red/20'
                    }`}
                  >
                    <CreditCard className={paymentMethod === 'card' ? 'text-heritage-red' : 'text-heritage-dark/40'} size={32} />
                    <span className={`mt-3 font-medium ${paymentMethod === 'card' ? 'text-heritage-red' : 'text-heritage-dark/60'}`}>Cards</span>
                  </button>
                  
                  <button 
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
                      paymentMethod === 'upi' ? 'border-heritage-red bg-heritage-red/5' : 'border-heritage-red/5 bg-white hover:border-heritage-red/20'
                    }`}
                  >
                    <Smartphone className={paymentMethod === 'upi' ? 'text-heritage-red' : 'text-heritage-dark/40'} size={32} />
                    <span className={`mt-3 font-medium ${paymentMethod === 'upi' ? 'text-heritage-red' : 'text-heritage-dark/60'}`}>UPI</span>
                  </button>

                  <button 
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
                      paymentMethod === 'cod' ? 'border-heritage-red bg-heritage-red/5' : 'border-heritage-red/5 bg-white hover:border-heritage-red/20'
                    }`}
                  >
                    <Truck className={paymentMethod === 'cod' ? 'text-heritage-red' : 'text-heritage-dark/40'} size={32} />
                    <span className={`mt-3 font-medium ${paymentMethod === 'cod' ? 'text-heritage-red' : 'text-heritage-dark/60'}`}>COD</span>
                  </button>
                </div>

                {/* Conditional Payment Forms */}
                <div className="bg-heritage-dark/5 rounded-2xl p-6 min-h-[160px] flex items-center justify-center">
                  {paymentMethod === 'card' && (
                    <div className="w-full grid grid-cols-2 gap-4">
                      <div className="col-span-2 space-y-1">
                        <label className="text-xs font-semibold text-heritage-dark/60 uppercase">Card Number</label>
                        <input type="text" placeholder="xxxx xxxx xxxx xxxx" className="w-full bg-white border border-heritage-red/10 rounded-xl py-3 px-4" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-heritage-dark/60 uppercase">Expiry</label>
                        <input type="text" placeholder="MM/YY" className="w-full bg-white border border-heritage-red/10 rounded-xl py-3 px-4" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-heritage-dark/60 uppercase">CVV</label>
                        <input type="password" placeholder="***" className="w-full bg-white border border-heritage-red/10 rounded-xl py-3 px-4" />
                      </div>
                    </div>
                  )}
                  {paymentMethod === 'upi' && (
                    <div className="w-full space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-heritage-dark/60 uppercase">Enter UPI ID</label>
                        <input type="text" placeholder="username@okaxis" className="w-full bg-white border border-heritage-red/10 rounded-xl py-3 px-4" />
                      </div>
                      <p className="text-center text-xs text-heritage-dark/40 italic">You will receive a notification in your UPI app</p>
                    </div>
                  )}
                  {paymentMethod === 'cod' && (
                    <div className="text-center">
                      <p className="text-heritage-dark/60 font-medium">Pay directly in cash when your order arrives at your doorstep.</p>
                      <p className="text-xs text-heritage-red mt-2">Extra ₹50 handling fee applies</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Right: Order Summary */}
            <div className="space-y-8">
              <section className="bg-heritage-dark text-white rounded-3xl p-8 shadow-xl sticky top-8">
                <h3 className="text-xl font-serif mb-8 border-b border-white/10 pb-4">Order Summary</h3>
                
                <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-start gap-4">
                      <div className="flex gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                          <p className="text-xs text-white/50">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold whitespace-nowrap">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-white/10 pt-6">
                  <div className="flex justify-between text-sm opacity-60">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm opacity-60">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  {paymentMethod === 'cod' && (
                    <div className="flex justify-between text-sm text-heritage-gold">
                      <span>COD Fee</span>
                      <span>₹50</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-serif pt-4">
                    <span>Total</span>
                    <span className="text-heritage-gold">₹{(totalPrice + (paymentMethod === 'cod' ? 50 : 0)).toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className={`w-full mt-10 py-4 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
                    isProcessing ? 'bg-white/20 cursor-not-allowed' : 'bg-heritage-gold text-heritage-dark hover:bg-white'
                  }`}
                >
                  {isProcessing ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <span>{paymentMethod === 'cod' ? 'Confirm Order' : 'Pay Now'}</span>
                      <ChevronRight className="ml-2" size={20} />
                    </>
                  )}
                </button>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;

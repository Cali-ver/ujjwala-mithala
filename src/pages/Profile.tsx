import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, ShoppingBag, Calendar, Package, LogOut, Settings, ChevronRight, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { getProfile } from '../services/authService';
import { getOrderHistory } from '../services/orderService';

interface UserProfile {
  name: string;
  email: string;
  username: string;
  roles: { name: string }[];
}

interface Order {
  id: number;
  orderNumber: string;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  orderDate: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await getProfile();
        setProfile(profileRes.data);

        const ordersRes = await getOrderHistory();
        if (Array.isArray(ordersRes.data)) {
          setOrders(ordersRes.data);
        }
      } catch (err) {
        console.error('Failed to fetch profile data', err);
        const token = localStorage.getItem('token');
        if (!token) navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-heritage-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-heritage-red border-t-transparent rounded-full animate-spin"></div>
          <p className="font-serif text-heritage-red animate-pulse">Loading Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-white/50 backdrop-blur-md rounded-3xl p-8 border border-heritage-red/5 shadow-sm text-center">
              <div className="w-24 h-24 bg-heritage-red text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-serif">
                {profile?.name?.charAt(0) || <User size={40} />}
              </div>
              <h2 className="text-2xl font-serif text-heritage-dark mb-1">{profile?.name || 'User'}</h2>
              <p className="text-sm text-heritage-dark/40 mb-6 italic">{profile?.username || 'Guest'}</p>
              <div className="space-y-4">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-heritage-red/5 transition-colors text-heritage-red font-medium">
                  <User size={18} /> Account details
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-heritage-red/5 transition-colors text-heritage-dark/60">
                  <Package size={18} /> My Orders
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-heritage-red/5 transition-colors text-heritage-dark/60">
                  <Settings size={18} /> Settings
                </button>
                <div className="pt-4 border-t border-heritage-red/5">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors text-red-500 font-medium"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-12">
            {/* Stats/Quick View */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-heritage-dark text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <p className="text-xs uppercase tracking-widest opacity-60 mb-2">Total Orders</p>
                <h3 className="text-4xl font-serif">{orders?.length || 0}</h3>
                <ShoppingBag className="absolute -bottom-4 -right-4 opacity-10" size={100} />
              </div>
              <div className="bg-white p-8 rounded-3xl border border-heritage-red/5 shadow-sm relative overflow-hidden">
                <p className="text-xs uppercase tracking-widest opacity-40 mb-2">Member Since</p>
                <h3 className="text-2xl font-serif text-heritage-dark">April 2024</h3>
                <Calendar className="absolute -bottom-4 -right-4 opacity-5 text-heritage-red" size={100} />
              </div>
              <div className="bg-heritage-gold/10 p-8 rounded-3xl border border-heritage-gold/20 shadow-sm relative overflow-hidden">
                <p className="text-xs uppercase tracking-widest text-heritage-gold/60 mb-2">Loyalty Points</p>
                <h3 className="text-4xl font-serif text-heritage-gold">450</h3>
                <div className="absolute -bottom-4 -right-4 opacity-10 text-heritage-gold">★</div>
              </div>
            </div>

            {/* Account Information */}
            <section>
              <h3 className="text-2xl font-serif mb-6 text-heritage-dark">Personal Information</h3>
              <div className="bg-white rounded-3xl p-8 border border-heritage-red/5 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-heritage-dark/40 ml-1">Full Name</label>
                    <div className="w-full bg-heritage-cream/30 border border-heritage-red/5 rounded-2xl py-4 px-6 flex items-center gap-3">
                      <User size={18} className="text-heritage-red" />
                      <span className="text-heritage-dark font-medium">{profile?.name || '---'}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-heritage-dark/40 ml-1">Email Address</label>
                    <div className="w-full bg-heritage-cream/30 border border-heritage-red/5 rounded-2xl py-4 px-6 flex items-center gap-3">
                      <Mail size={18} className="text-heritage-red" />
                      <span className="text-heritage-dark font-medium">{profile?.email || '---'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Order History */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-serif text-heritage-dark">Order History</h3>
                <button className="text-heritage-red text-sm font-bold uppercase tracking-widest hover:underline">View All</button>
              </div>
              
              <div className="space-y-4">
                {!orders || orders.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-heritage-red/20">
                    <p className="text-heritage-dark/40 italic">You haven't placed any orders yet.</p>
                    <button 
                      onClick={() => navigate('/shop')}
                      className="mt-4 text-heritage-red font-bold uppercase tracking-widest text-xs"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  orders.map((order) => (
                    <motion.div 
                      key={order?.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl p-6 border border-heritage-red/5 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-heritage-cream rounded-full flex items-center justify-center text-heritage-red">
                            <Package size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-heritage-dark">Order #{order?.orderNumber?.slice(0, 8) || 'N/A'}</p>
                            <p className="text-xs text-heritage-dark/40">
                                {order?.orderDate ? new Date(order.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Date unknown'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-8">
                          <div className="text-right">
                            <p className="text-xs text-heritage-dark/40 uppercase tracking-widest mb-1">Status</p>
                            <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-widest">
                              {order?.status || 'PENDING'}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-heritage-dark/40 uppercase tracking-widest mb-1">Total</p>
                            <p className="font-bold text-heritage-red">₹{order?.totalAmount?.toLocaleString() || 0}</p>
                          </div>
                          <button className="p-2 rounded-full bg-heritage-cream opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight size={20} className="text-heritage-dark/40" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;

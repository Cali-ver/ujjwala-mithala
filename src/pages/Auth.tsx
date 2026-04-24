import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, LogIn, Globe, Shield, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { login, register } from '../services/authService';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isLogin) {
        const response = await login(email, password);
        const token = response.data.accessToken;
        localStorage.setItem('token', token);
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => navigate('/'), 2000);
      } else {
        // For registration, we'll use email as username for simplicity in this flow
        const username = email.split('@')[0]; 
        await register(name, username, email, password);
        setSuccess('Registration successful! You can now login.');
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-heritage-cream py-20 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-heritage-red/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-heritage-gold/5 rounded-full blur-3xl animate-pulse"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card rounded-3xl overflow-hidden z-10"
      >
        <div className="p-8 md:p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif text-heritage-dark mb-2">
              {isLogin ? 'Welcome Back' : 'Join Our Heritage'}
            </h1>
            <p className="text-heritage-dark/60 text-sm">
              {isLogin 
                ? 'Sign in to continue your journey through Mithila art.' 
                : 'Create an account to save your favorite pieces and support local artists.'}
            </p>
          </div>

          <div className="flex bg-heritage-dark/5 p-1 rounded-xl mb-8">
            <button 
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                isLogin ? 'bg-white shadow-sm text-heritage-red' : 'text-heritage-dark/60 hover:text-heritage-dark'
              }`}
            >
              Login
            </button>
            <button 
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                !isLogin ? 'bg-white shadow-sm text-heritage-red' : 'text-heritage-dark/60 hover:text-heritage-dark'
              }`}
            >
              Register
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: isLogin ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 10 : -10 }}
              transition={{ duration: 0.2 }}
            >
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 flex items-center">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></div>
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm mb-6 flex items-center">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></div>
                  {success}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-heritage-dark/70 uppercase tracking-wider ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-heritage-dark/40" size={18} />
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ujjwal Mithila" 
                        className="w-full bg-white/50 border border-heritage-dark/10 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-heritage-red/20 focus:border-heritage-red outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-heritage-dark/70 uppercase tracking-wider ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-heritage-dark/40" size={18} />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hello@mithila.com" 
                      className="w-full bg-white/50 border border-heritage-dark/10 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-heritage-red/20 focus:border-heritage-red outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-xs font-semibold text-heritage-dark/70 uppercase tracking-wider">Password</label>
                    {isLogin && (
                       <Link to="/forgot-password" className="text-xs text-heritage-red hover:underline">Forgot?</Link>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-heritage-dark/40" size={18} />
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="w-full bg-white/50 border border-heritage-dark/10 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-heritage-red/20 focus:border-heritage-red outline-none transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full btn-primary py-4 flex items-center justify-center group mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                      <LogIn size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-heritage-dark/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-heritage-cream px-2 text-heritage-dark/40">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="flex items-center justify-center space-x-2 py-3 bg-white/50 border border-heritage-dark/10 rounded-xl hover:bg-white transition-colors">
                  <Globe size={18} className="text-blue-600" />
                  <span className="text-sm">Google</span>
                </button>
                <button type="button" className="flex items-center justify-center space-x-2 py-3 bg-white/50 border border-heritage-dark/10 rounded-xl hover:bg-white transition-colors">
                  <Shield size={18} className="text-gray-800" />
                  <span className="text-sm">Account</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="p-6 bg-heritage-dark/5 text-center">
          <p className="text-sm text-heritage-dark/60">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-heritage-red font-semibold hover:underline"
            >
              {isLogin ? 'Sign up now' : 'Log in instead'}
            </button>
          </p>
        </div>
      </motion.div>

      {/* Back to home */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center text-heritage-dark/60 hover:text-heritage-red transition-colors z-20"
      >
        <ArrowRight size={20} className="rotate-180 mr-2" />
        <span className="font-medium">Back to Home</span>
      </Link>
    </div>
  );
};

export default Auth;

import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Lazy loading pages for performance
const Home = lazy(() => import('./pages/Home'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Shop = lazy(() => import('./pages/Shop'));
const Artists = lazy(() => import('./pages/Artists'));
const Auth = lazy(() => import('./pages/Auth'));

const LoadingFallback = () => (
  <div className="h-screen w-full flex items-center justify-center bg-heritage-cream">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-heritage-red border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-serif text-heritage-red italic animate-pulse">Loading Heritage...</p>
    </div>
  </div>
);

const NotFound = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-heritage-cream px-4 text-center">
    <h1 className="text-9xl font-serif text-heritage-red opacity-10 mb-[-2rem]">404</h1>
    <h2 className="text-4xl font-serif mb-6 text-heritage-dark">Lost in Tradition?</h2>
    <p className="opacity-60 mb-10 max-w-md">The page you are looking for has been moved to the archives or never existed in this timeline.</p>
    <a href="/" className="btn-primary">Return to Home</a>
  </div>
);

function App() {
  return (
    <AppProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/heritage" element={<Home />} /> {/* Placeholder */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AppProvider>
  );
}

export default App;

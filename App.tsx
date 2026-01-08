
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import AssetCard from './components/AssetCard';
import Cart from './components/Cart';
import { MOCK_ASSETS } from './constants';
import { Asset, AssetType, CartItem } from './types';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<AssetType | 'All'>('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredAssets = useMemo(() => {
    return MOCK_ASSETS.filter(asset => {
      const matchesSearch = asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            asset.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || asset.type === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const handleAddToCart = (asset: Asset) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === asset.id);
      if (existing) return prev; // Avoid duplicates for single-license digital assets
      return [...prev, { ...asset, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF]">
      <Header 
        cartCount={cartItems.length} 
        onOpenCart={() => setIsCartOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-indigo-600 pt-16 pb-24 px-6 md:px-12 text-center text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-white">
            <path d="M0 0 L100 0 L100 100 Z" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            NEW: AI-POWERED DESIGN SUITE
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            High-Quality Assets for the <br/><span className="text-indigo-200">Modern Creator</span>
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 mb-10 font-light max-w-2xl mx-auto">
            Browse thousands of curated vectors, textures, and fonts to accelerate your creative workflow.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all">
              Start Free Trial
            </button>
            <button className="bg-indigo-500 text-white border border-indigo-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-400 transition-all">
              View All Bundles
            </button>
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <div className="sticky top-[72px] md:top-[88px] z-40 bg-white/95 backdrop-blur-md shadow-sm border-b py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeCategory === 'All' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Assets
            </button>
            {Object.values(AssetType).map(type => (
              <button 
                key={type}
                onClick={() => setActiveCategory(type)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeCategory === type ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type}s
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <span className="text-gray-400 text-sm font-medium">Sort by:</span>
            <select className="bg-transparent font-semibold text-gray-800 outline-none cursor-pointer">
              <option>Newest First</option>
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {activeCategory === 'All' ? 'Featured Collections' : `${activeCategory} Collection`}
            </h2>
            <p className="text-gray-500 mt-1">
              Found {filteredAssets.length} premium assets for your next project.
            </p>
          </div>
        </div>

        {filteredAssets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAssets.map(asset => (
              <AssetCard 
                key={asset.id} 
                asset={asset} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <i className="fa-solid fa-magnifying-glass text-4xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">No assets found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search filters or browse other categories.</p>
            <button 
              onClick={() => {setSearchTerm(''); setActiveCategory('All');}}
              className="mt-6 text-indigo-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      {/* Trust Section */}
      <section className="bg-gray-900 text-white py-20 px-6 md:px-12 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-shield-halved text-2xl text-indigo-400"></i>
            </div>
            <h4 className="text-xl font-bold mb-3">Lifetime License</h4>
            <p className="text-gray-400">Pay once, use forever in unlimited commercial and personal projects.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-cloud-arrow-down text-2xl text-indigo-400"></i>
            </div>
            <h4 className="text-xl font-bold mb-3">Instant Access</h4>
            <p className="text-gray-400">Download your files immediately after purchase in multiple formats.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-headset text-2xl text-indigo-400"></i>
            </div>
            <h4 className="text-xl font-bold mb-3">Premium Support</h4>
            <p className="text-gray-400">Our dedicated support team is here to help you 24/7 with any questions.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-gem text-white text-sm"></i>
              </div>
              <span className="text-xl font-black tracking-tight">DesignVault</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-6">
              The leading marketplace for designers and creative agencies seeking high-end digital assets. Crafted by professionals, for professionals.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all"><i className="fa-brands fa-dribbble"></i></a>
              <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Explore</h5>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><a href="#" className="hover:text-indigo-600">Featured Items</a></li>
              <li><a href="#" className="hover:text-indigo-600">Popular Assets</a></li>
              <li><a href="#" className="hover:text-indigo-600">Flash Deals</a></li>
              <li><a href="#" className="hover:text-indigo-600">Membership</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Company</h5>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-600">Sell on Vault</a></li>
              <li><a href="#" className="hover:text-indigo-600">Licensing</a></li>
              <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm">© 2024 DesignVault Inc. All rights reserved.</p>
          <div className="flex gap-8 text-sm text-gray-400 font-medium">
            <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600">Cookie Settings</a>
          </div>
        </div>
      </footer>

      {/* Overlay Components */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
};

export default App;

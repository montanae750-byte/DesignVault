
import React from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, searchTerm, onSearchChange }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
          <i className="fa-solid fa-gem text-white text-xl"></i>
        </div>
        <span className="text-2xl font-black tracking-tight text-gray-900">DesignVault</span>
      </div>

      <div className="relative w-full max-w-xl">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input 
          type="text" 
          placeholder="Search vectors, fonts, textures..." 
          className="w-full bg-gray-100 border-none rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <nav className="flex items-center gap-6">
        <a href="#" className="hidden md:block font-medium text-gray-600 hover:text-indigo-600 transition-colors">Sell Assets</a>
        <button 
          onClick={onOpenCart}
          className="relative p-2 text-gray-700 hover:text-indigo-600 transition-colors"
        >
          <i className="fa-solid fa-cart-shopping text-xl"></i>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>
        <button className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-gray-800 transition-all">
          Sign In
        </button>
      </nav>
    </header>
  );
};

export default Header;

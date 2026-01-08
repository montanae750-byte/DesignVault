
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove }) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-cart-shopping text-indigo-600"></i>
            Your Cart
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <i className="fa-solid fa-basket-shopping text-6xl mb-4"></i>
              <p className="text-xl font-medium">Your cart is empty</p>
              <p className="text-sm mt-2">Discover premium assets to start building.</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  <p className="text-gray-500 text-xs mt-1">{item.type} • {item.creator}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-indigo-600">${item.price.toFixed(2)}</span>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t bg-gray-50 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-medium text-gray-600">Subtotal</span>
              <span className="font-bold text-2xl text-gray-900">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-200">
              Checkout Now
            </button>
            <p className="text-center text-xs text-gray-400">Securely processed by Stripe</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default Cart;

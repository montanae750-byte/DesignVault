
import React from 'react';
import { Asset } from '../types';

interface AssetCardProps {
  asset: Asset;
  onAddToCart: (asset: Asset) => void;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      <div className="relative overflow-hidden h-48">
        <img 
          src={asset.imageUrl} 
          alt={asset.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-semibold text-indigo-600 shadow-sm">
          {asset.type}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {asset.title}
          </h3>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {asset.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-2xl font-bold text-gray-900">${asset.price.toFixed(2)}</span>
            <div className="flex items-center gap-1 mt-1">
              <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
              <span className="text-xs font-medium text-gray-600">{asset.rating} ({asset.sales} sales)</span>
            </div>
          </div>
          
          <button 
            onClick={() => onAddToCart(asset)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg transition-colors flex items-center justify-center"
            aria-label="Add to cart"
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;

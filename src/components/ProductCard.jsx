import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowUpRight, ShieldCheck, Activity } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-panel group overflow-hidden bg-white"
    >
      <div className="relative aspect-[4/5] bg-bg-alt flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-5 to-transparent"></div>
        
        {/* Visual Representation */}
        <div className="relative w-40 h-40 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-border group-hover:scale-105 transition-transform duration-500">
           <Activity size={48} className="text-primary opacity-10 group-hover:opacity-30 transition-opacity" />
           <span className="absolute bottom-4 right-4 text-[10px] font-mono text-text-muted opacity-40">BATCH: V2.1</span>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-white opacity-90 backdrop-blur-sm text-primary text-[10px] uppercase font-extrabold px-3 py-1 rounded-full border border-primary-10 shadow-sm">
          {product.category}
        </div>
        
        {/* Quick Add (Professional Style) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 bg-white opacity-95 backdrop-blur-md border-t border-border">
           <button className="w-full btn-primary py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
             <ShoppingCart size={14} /> Quick Add
           </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-xl font-bold hover:text-primary transition-colors outfit-font leading-tight">{product.name}</h3>
          </Link>
          <span className="text-xl font-bold text-slate-900">${product.price}</span>
        </div>
        
        <p className="text-sm text-text-muted mb-6 line-clamp-2 leading-relaxed h-10">
          {product.shortDescription}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-border-light">
           <Link 
             to={`/product/${product.id}`} 
             className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-primary hover:text-primary-hover transition-colors"
           >
             Technical Specs <ArrowUpRight size={14} />
           </Link>
           <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase">
             <ShieldCheck size={12} /> In Stock
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

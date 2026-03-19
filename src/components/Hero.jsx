import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Zap, Shield, Droplets } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full -mr-48 -mt-48 z-0"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full -ml-48 -mb-48 z-0"></div>

      <div className="container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-panel mb-6 rounded-full border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Premium Grade Peptides</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl mb-6 leading-[1.1]">
              Elevate Your <span className="glow-text">Research</span> <br /> 
              Protect Your <span className="text-secondary italic">Potential</span>
            </h1>
            
            <p className="text-lg text-text-muted mb-10 max-w-lg leading-relaxed">
              Science-backed peptide solutions for tissue repair, cognitive enhancement, and metabolic optimization. Designed for those who demand the best.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="btn-primary flex items-center gap-2">
                Explore the Shop <ArrowRight size={18} />
              </Link>
              <Link to="/#about" className="btn-secondary">
                Learn More
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 grayscale opacity-50">
              <div className="flex items-center gap-2 text-sm font-semibold italic"><Shield size={16} /> Lab Tested</div>
              <div className="flex items-center gap-2 text-sm font-semibold italic"><Activity size={16} /> 99%+ Purity</div>
              <div className="flex items-center gap-2 text-sm font-semibold italic"><Zap size={16} /> Fast Delivery</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse"></div>
              <div className="relative glass-panel p-8 rotate-3 hover:rotate-0 transition-transform duration-500">
                 <div className="aspect-square bg-gradient-to-br from-surface to-surface-bright rounded-3xl flex items-center justify-center border border-white/5 shadow-2xl overflow-hidden">
                    <Droplets size={120} className="text-primary/40 animate-bounce" />
                    {/* Abstract science shapes */}
                    <div className="absolute top-4 left-4 w-12 h-12 border-2 border-primary/20 rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 border border-secondary/20 rounded-full"></div>
                 </div>
                 <div className="mt-8">
                    <div className="h-4 w-32 bg-primary/20 rounded-full mb-4"></div>
                    <div className="h-6 w-full bg-surface-bright rounded-lg mb-4"></div>
                    <div className="h-6 w-4/5 bg-surface-bright rounded-lg"></div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

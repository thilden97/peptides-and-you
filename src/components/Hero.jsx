import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Zap, ShieldCheck } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-[85vh] flex items-center pt-24 pb-12 overflow-hidden bg-bg-alt">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-105 blur-[100px] rounded-full -mr-32 -mt-32"></div>
      
      <div className="container relative z-10 w-full">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-full mb-8 shadow-sm">
              <ShieldCheck size={16} className="text-secondary" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-text-muted">Certified Research Standards</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl mb-8 leading-[1.05] tracking-tight">
              Premium Grade <br />
              <span className="glow-text font-extrabold">Peptide Research</span>
            </h1>
            
            <p className="text-xl text-text-muted mb-12 max-w-2xl leading-relaxed">
              Accelerate your biological discovery with lab-verified, 99%+ purity peptides. Designed for clinical-grade precision and reliability.
            </p>

            <div className="flex flex-wrap gap-5 justify-center">
              <Link to="/shop" className="btn-primary flex items-center gap-2 text-lg">
                View Full Catalog <ArrowRight size={20} />
              </Link>
              <Link to="/#about" className="btn-secondary text-lg">
                Stability Data
              </Link>
            </div>

            <div className="mt-16 pt-8 border-t border-border flex flex-wrap justify-center items-center gap-10 md:gap-16">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-slate-900 line-height-1">99.8%</span>
                <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Average Purity</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-slate-900 line-height-1">24h</span>
                <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Global Express</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-slate-900 line-height-1">COA</span>
                <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Batch Included</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

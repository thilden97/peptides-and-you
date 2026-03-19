import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { peptides } from '../data/peptides';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, CheckCircle2, ShieldCheck, Activity, Database, FileText } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const product = peptides.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <div className="pt-40 text-center text-2xl font-bold">Material not found in catalog.</div>;

  return (
    <div className="product-details-page pt-32 pb-24 bg-white">
      <Helmet>
        <title>{product.name} | Lab-Verified Research Material | Peptides and You</title>
        <meta name="description" content={product.shortDescription} />
        <meta name="keywords" content={product.seoKeywords.join(', ')} />
      </Helmet>

      <div className="container">
        <Link to="/shop" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-12 group font-bold text-sm uppercase tracking-widest">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Laboratory Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Technical Illustration Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-32"
          >
            <div className="bg-bg-alt aspect-square relative rounded-[40px] flex items-center justify-center p-16 border border-border overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent"></div>
               <div className="relative w-full h-full border-2 border-dashed border-border rounded-[32px] flex flex-col items-center justify-center text-center bg-white/50 backdrop-blur-sm shadow-sm">
                  <Activity size={100} className="text-primary mb-8 animate-pulse opacity-40" />
                  <h4 className="text-3xl font-extrabold opacity-40 outfit-font uppercase tracking-widest leading-none mb-2">{product.name}</h4>
                  <p className="text-[10px] text-text-muted font-mono tracking-widest uppercase">Certified Ref: PAU-SPEC-{product.id.toUpperCase()}</p>
               </div>
               
               {/* Overlay Badge */}
               <div className="absolute bottom-10 right-10 bg-white p-5 rounded-2xl shadow-xl border border-border flex items-center gap-3">
                  <div className="bg-emerald-50 p-2 rounded-lg">
                     <ShieldCheck size={24} className="text-emerald-600" />
                  </div>
                  <div>
                     <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-tight">Authenticity</p>
                     <p className="text-sm font-bold text-slate-900 leading-tight">99.8% Purity</p>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Data Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-10 border-primary-10 text-[10px] uppercase font-extrabold tracking-widest rounded-full mb-8 border">
              {product.category}
            </div>
            
            <h1 className="text-6xl mb-6 tracking-tight font-extrabold">{product.name}</h1>
            <div className="flex items-center gap-6 mb-10">
               <p className="text-4xl font-extrabold text-slate-900">${product.price}</p>
               <div className="h-10 w-[1px] bg-border-light"></div>
               <p className="text-sm font-bold text-emerald-600 flex items-center gap-2">
                  <CheckCircle2 size={16} /> Batch Ready for Shipment
               </p>
            </div>
            
            <p className="text-xl text-text-muted mb-12 leading-relaxed font-medium">
              {product.description}
            </p>

            {/* Benefits / Research Indications */}
            <div className="bg-bg-alt p-10 rounded-3xl mb-12 border border-border">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3 outfit-font underline decoration-primary-20 decoration-4 underline-offset-8">Research Indicators</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-4 text-sm font-semibold text-slate-700 leading-snug">
                    <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 mb-16">
              <button className="flex-1 btn-primary py-5 flex items-center justify-center gap-3 text-lg">
                <ShoppingCart size={22} /> Add to Procurement
              </button>
              <button className="px-8 btn-secondary py-5 flex items-center justify-center gap-3 text-lg border-primary-20 text-primary hover:bg-primary-5">
                <FileText size={22} /> SDS / COA Data
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
               <div className="bg-white border border-border p-6 rounded-2xl text-center shadow-sm">
                  <span className="block text-[10px] uppercase font-extrabold text-text-muted mb-2 tracking-widest">Purity Grade</span>
                  <span className="text-2xl font-bold text-slate-900">99.8%+</span>
               </div>
               <div className="bg-white border border-border p-6 rounded-2xl text-center shadow-sm">
                  <span className="block text-[10px] uppercase font-extrabold text-text-muted mb-2 tracking-widest">Vial State</span>
                  <span className="text-2xl font-bold text-slate-900">Lyophilized</span>
               </div>
               <div className="bg-white border border-border p-6 rounded-2xl text-center shadow-sm">
                  <span className="block text-[10px] uppercase font-extrabold text-text-muted mb-2 tracking-widest">Protocol</span>
                  <span className="text-2xl font-bold text-slate-900">ISO-9001</span>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Narrative SEO Section */}
        <section className="mt-32 pt-24 border-t border-border">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1">
                 <div className="p-4 bg-primary-10 rounded-2xl inline-block mb-6">
                    <Database size={32} className="text-primary" />
                 </div>
                 <h2 className="text-3xl font-extrabold tracking-tight mb-4">Scientific Analysis</h2>
                 <p className="text-text-muted font-medium">Detailed biochemical background for <strong>{product.name}</strong> research applications.</p>
              </div>
              <div className="lg:col-span-2 space-y-8 text-lg text-slate-700 leading-relaxed font-medium">
                 <p>
                   The molecular architecture of <strong>{product.name}</strong> is synthesized via automated solid-phase peptide synthesis (SPPS) protocols, 
                   minimizing human intervention and maximizing batch consistency. Analytical evaluation focuses on <strong>{product.seoKeywords[1]}</strong> 
                   and secondary structural stability under various research conditions.
                 </p>
                 <p>
                   Researchers investigating <strong>{product.seoKeywords[2]}</strong> will find that this material maintains optimal binding affinity 
                   and bio-identical profiles. Our facility implements strict cold-chain management from synthesis to storage, preventing 
                   degradation of sensitive amino acid sequences.
                 </p>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;

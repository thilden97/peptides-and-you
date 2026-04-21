import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { peptides } from '../data/peptides';
import {
  ArrowRight, ArrowLeft, Sparkles, CheckCircle2, Heart,
  Brain, Dumbbell, Scale, Clock, Shield, Zap, Target
} from 'lucide-react';

const QUIZ_STEPS = [
  {
    id: 'goal',
    question: "What's your primary goal?",
    subtitle: 'Select the area you want to focus on most.',
    options: [
      { id: 'recovery', label: 'Healing & Recovery', desc: 'Injury repair, joint pain, gut health', icon: Heart, tags: ['recovery', 'healing', 'gut-health', 'joint-pain'] },
      { id: 'weight', label: 'Weight Management', desc: 'Fat loss, appetite control, metabolism', icon: Scale, tags: ['weight-loss', 'fat-burning', 'metabolic', 'body-composition'] },
      { id: 'anti-aging', label: 'Anti-Aging & Skin', desc: 'Wrinkles, collagen, hair, longevity', icon: Clock, tags: ['anti-aging', 'skin', 'collagen', 'longevity', 'hair'] },
      { id: 'cognitive', label: 'Cognitive & Mood', desc: 'Focus, memory, anxiety relief, brain health', icon: Brain, tags: ['cognitive', 'focus', 'memory', 'mood', 'anxiety'] },
      { id: 'performance', label: 'Performance & Muscle', desc: 'Growth hormone, lean muscle, recovery', icon: Dumbbell, tags: ['growth-hormone', 'performance', 'muscle', 'sleep'] },
      { id: 'longevity', label: 'Longevity & Immune', desc: 'Cellular health, telomeres, DNA protection', icon: Shield, tags: ['longevity', 'immune', 'telomeres', 'anti-aging'] },
    ]
  },
  {
    id: 'specific',
    question: "What specific issues concern you most?",
    subtitle: 'Choose up to 3 that apply.',
    multiSelect: true,
    maxSelect: 3,
    options: [
      { id: 'joint-pain', label: 'Joint or tendon pain', tags: ['joint-pain', 'recovery'] },
      { id: 'gut', label: 'Gut health issues', tags: ['gut-health', 'healing'] },
      { id: 'stubborn-fat', label: 'Stubborn body fat', tags: ['fat-burning', 'weight-loss', 'body-composition'] },
      { id: 'wrinkles', label: 'Wrinkles & skin aging', tags: ['anti-aging', 'skin', 'collagen'] },
      { id: 'brain-fog', label: 'Brain fog & poor focus', tags: ['cognitive', 'focus', 'brain'] },
      { id: 'anxiety-stress', label: 'Anxiety or stress', tags: ['mood', 'anxiety', 'stress', 'calm'] },
      { id: 'poor-sleep', label: 'Poor sleep quality', tags: ['sleep', 'recovery'] },
      { id: 'low-energy', label: 'Low energy & fatigue', tags: ['performance', 'growth-hormone', 'metabolic'] },
      { id: 'hair-loss', label: 'Hair thinning / loss', tags: ['hair', 'anti-aging'] },
      { id: 'post-surgery', label: 'Post-surgery recovery', tags: ['post-surgery', 'healing', 'recovery'] },
      { id: 'scar-tissue', label: 'Scar tissue buildup', tags: ['scar-tissue', 'healing', 'flexibility'] },
      { id: 'appetite', label: 'Appetite control', tags: ['appetite', 'weight-loss'] },
    ]
  },
  {
    id: 'experience',
    question: "How experienced are you with peptides?",
    subtitle: "This helps us recommend the right starting point.",
    options: [
      { id: 'beginner', label: "I'm completely new", desc: "Haven't used peptides before", icon: Target, tags: ['beginner-friendly'] },
      { id: 'intermediate', label: 'Somewhat experienced', desc: 'Used 1-2 peptides before', icon: Zap, tags: ['intermediate'] },
      { id: 'advanced', label: 'Very experienced', desc: 'Regular peptide user, looking for advanced options', icon: Sparkles, tags: ['advanced'] },
    ]
  },
  {
    id: 'budget',
    question: "What's your budget range?",
    subtitle: 'Per product, per purchase.',
    options: [
      { id: 'low', label: 'Under ₱2,000', desc: 'Entry-level compounds', maxPrice: 2000 },
      { id: 'mid', label: '₱2,000 – ₱4,000', desc: 'Mid-range options', maxPrice: 4000 },
      { id: 'high', label: '₱4,000+', desc: 'Premium & advanced compounds', maxPrice: 999999 },
    ]
  }
];

function getRecommendations(answers) {
  const goalTags = answers.goal?.tags || [];
  const specificTags = (answers.specific || []).flatMap(s => s.tags || []);
  const expTags = answers.experience?.tags || [];
  const maxPrice = answers.budget?.maxPrice || 999999;
  const allTags = [...goalTags, ...specificTags, ...expTags];

  const scored = peptides.map(product => {
    const matchingTags = product.quizTags.filter(t => allTags.includes(t));
    const tagScore = matchingTags.length;
    const minPrice = Math.min(...product.variants.map(v => v.price));
    const priceMatch = minPrice <= maxPrice ? 1 : 0;
    const total = (tagScore * 10) + (priceMatch * 5);
    return { ...product, score: total, matchingTags, priceMatch };
  });

  return scored
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function getMatchReason(product, answers) {
  const goalLabel = answers.goal?.label || '';
  const specificLabels = (answers.specific || []).map(s => s.label).join(', ');
  const reasons = [];

  if (product.matchingTags.length >= 3) {
    reasons.push(`Strong match for your ${goalLabel.toLowerCase()} goals`);
  } else {
    reasons.push(`Aligned with your focus on ${goalLabel.toLowerCase()}`);
  }

  if (specificLabels) {
    reasons.push(`Addresses: ${specificLabels}`);
  }

  if (product.priceMatch) {
    reasons.push('Within your budget range');
  }

  return reasons;
}

const Quiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const currentStep = QUIZ_STEPS[step];
  const progress = ((step + 1) / (QUIZ_STEPS.length + 1)) * 100;

  const handleSelect = (option) => {
    if (currentStep.multiSelect) {
      const current = answers[currentStep.id] || [];
      const isSelected = current.find(o => o.id === option.id);
      let updated;
      if (isSelected) {
        updated = current.filter(o => o.id !== option.id);
      } else if (current.length < (currentStep.maxSelect || 99)) {
        updated = [...current, option];
      } else {
        return;
      }
      setAnswers({ ...answers, [currentStep.id]: updated });
    } else {
      setAnswers({ ...answers, [currentStep.id]: option });
      // Auto-advance for single select
      setTimeout(() => {
        if (step < QUIZ_STEPS.length - 1) {
          setStep(step + 1);
        } else {
          setShowResults(true);
        }
      }, 300);
    }
  };

  const handleNext = () => {
    if (step < QUIZ_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
    window.scrollTo(0, 0);
  };

  const isOptionSelected = (option) => {
    if (currentStep?.multiSelect) {
      return (answers[currentStep.id] || []).find(o => o.id === option.id);
    }
    return answers[currentStep?.id]?.id === option.id;
  };

  const recommendations = showResults ? getRecommendations(answers) : [];

  return (
    <div style={{paddingTop: 180, paddingBottom: 80, background: 'var(--bg)', minHeight: '100vh'}}>
      <Helmet>
        <title>Peptide Quiz — Find Your Perfect Peptide | Peptides & You</title>
        <meta name="description" content="Take our 60-second quiz to discover which peptides are right for your goals. Personalized recommendations for recovery, weight loss, anti-aging, cognitive enhancement, and more." />
        <link rel="canonical" href="https://peptidesandyou.com/quiz" />
        <meta property="og:title" content="Find Your Perfect Peptide | Peptides & You Quiz" />
        <meta property="og:description" content="Personalized peptide recommendations in 60 seconds." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peptidesandyou.com/quiz" />
      </Helmet>

      <div className="container" style={{maxWidth: 720, margin: '0 auto'}}>
        {/* Header */}
        <div style={{textAlign: 'center', marginBottom: 40}}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 14px', borderRadius: 8,
            background: 'var(--accent-light)', border: '1px solid rgba(79,191,159,0.2)',
            marginBottom: 16, fontSize: 11, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)',
          }}>
            <Sparkles size={14} /> Personalized Recommendation
          </div>
          <h1 className="montserrat" style={{fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: 'var(--text)', marginBottom: 8}}>
            {showResults ? 'Your Personalized Results' : 'Find Your Perfect Peptide'}
          </h1>
          <p style={{color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6}}>
            {showResults ? 'Based on your answers, here are our top recommendations.' : 'Answer a few quick questions and we\'ll match you to the right compounds.'}
          </p>
        </div>

        {/* Progress Bar */}
        {!showResults && (
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{width: `${progress}%`}} />
          </div>
        )}

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              {/* Question */}
              <div style={{marginBottom: 28}}>
                <h2 className="montserrat" style={{fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 6}}>
                  {currentStep.question}
                </h2>
                <p style={{fontSize: 14, color: 'var(--text-muted)'}}>
                  {currentStep.subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="quiz-options-grid">
                {currentStep.options.map((option) => {
                  const Icon = option.icon;
                  const selected = isOptionSelected(option);
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelect(option)}
                      className={`quiz-option ${selected ? 'selected' : ''}`}
                    >
                      <div className="quiz-option-inner">
                        {Icon && (
                          <div className="quiz-option-icon">
                            <Icon size={22} />
                          </div>
                        )}
                        <div>
                          <div className="quiz-option-label">{option.label}</div>
                          {option.desc && <div className="quiz-option-desc">{option.desc}</div>}
                        </div>
                        {selected && <CheckCircle2 size={20} color="var(--primary)" style={{marginLeft: 'auto', flexShrink: 0}} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32}}>
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: 14, fontWeight: 600, color: step === 0 ? 'var(--text-light)' : 'var(--text-secondary)',
                    background: 'none', cursor: step === 0 ? 'default' : 'pointer',
                  }}
                >
                  <ArrowLeft size={16} /> Back
                </button>

                {currentStep.multiSelect && (
                  <button
                    onClick={handleNext}
                    disabled={!(answers[currentStep.id]?.length > 0)}
                    className="btn-primary"
                    style={{
                      padding: '12px 28px', fontSize: 14,
                      opacity: answers[currentStep.id]?.length > 0 ? 1 : 0.5,
                    }}
                  >
                    {step === QUIZ_STEPS.length - 1 ? 'See Results' : 'Next'} <ArrowRight size={16} />
                  </button>
                )}

                <span style={{fontSize: 12, color: 'var(--text-light)', fontWeight: 600}}>
                  {step + 1} / {QUIZ_STEPS.length}
                </span>
              </div>
            </motion.div>
          ) : (
            /* Results */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {recommendations.length > 0 ? (
                <div className="quiz-results-grid">
                  {recommendations.map((product, i) => {
                    const reasons = getMatchReason(product, answers);
                    const firstVariant = product.variants[0];
                    return (
                      <div key={product.id} className="quiz-result-card">
                        {i === 0 && (
                          <div className="quiz-result-badge">
                            <Sparkles size={12} /> Best Match
                          </div>
                        )}
                        <div style={{display: 'flex', gap: 20, alignItems: 'flex-start'}}>
                          <img
                            src="/peptide-vial-branded.png"
                            alt={product.name}
                            style={{width: 90, height: 90, objectFit: 'contain', borderRadius: 10, background: 'var(--primary-light)', padding: 8}}
                          />
                          <div style={{flex: 1}}>
                            <h3 className="montserrat" style={{fontSize: 19, fontWeight: 700, color: 'var(--text)', marginBottom: 4}}>
                              {product.name}
                            </h3>
                            <span style={{
                              display: 'inline-block', fontSize: 10, fontWeight: 600,
                              color: 'var(--primary)', background: 'var(--primary-light)',
                              padding: '2px 8px', borderRadius: 4, marginBottom: 8,
                              textTransform: 'uppercase', letterSpacing: '0.04em',
                            }}>{product.category}</span>
                            <p style={{fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 12}}>
                              {product.shortDescription}
                            </p>

                            {/* Why this works */}
                            <div style={{
                              background: 'var(--accent-light)', padding: '10px 14px', borderRadius: 8,
                              border: '1px solid rgba(79,191,159,0.15)', marginBottom: 14,
                            }}>
                              <p style={{fontSize: 11, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4}}>
                                Why this works for you
                              </p>
                              {reasons.map((r, ri) => (
                                <p key={ri} style={{fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6}}>
                                  <CheckCircle2 size={12} color="var(--accent)" /> {r}
                                </p>
                              ))}
                            </div>

                            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                              <span className="montserrat" style={{fontSize: 18, fontWeight: 700, color: 'var(--primary)'}}>
                                From ₱{firstVariant.price.toLocaleString()}
                              </span>
                              <Link to={`/product/${product.id}`} className="btn-primary" style={{padding: '8px 20px', fontSize: 13}}>
                                View Details <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{textAlign: 'center', padding: 40}}>
                  <p style={{fontSize: 16, color: 'var(--text-secondary)', marginBottom: 20}}>
                    We couldn't find a perfect match. Browse our full catalog for all options.
                  </p>
                  <Link to="/shop" className="btn-primary" style={{padding: '14px 32px'}}>
                    Browse All Peptides <ArrowRight size={16} />
                  </Link>
                </div>
              )}

              {/* Bottom CTAs */}
              <div style={{display: 'flex', gap: 12, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap'}}>
                <button onClick={handleRestart} className="btn-outline" style={{padding: '12px 28px', fontSize: 14}}>
                  <ArrowLeft size={16} /> Retake Quiz
                </button>
                <Link to="/shop" className="btn-primary" style={{padding: '12px 28px', fontSize: 14}}>
                  Browse All Products <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;

import React from 'react';
import { ArrowRight, Brain, Code, Sparkles, Zap, Award, Star } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const HeroSection = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section 
      ref={ref}
      className={`relative pt-12 pb-20 lg:pt-20 lg:pb-32 hero-bg overflow-hidden scroll-reveal-section ${isVisible ? 'visible' : ''}`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Enhanced headline with better typography */}
          <div className="mb-8 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-slate-200 shadow-lg">
              <Zap className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold text-slate-700">AI-Enhanced Digital Studio</span>
              <Sparkles className="h-4 w-4 text-teal-600" />
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              <span className="gradient-text">Your Vision, Engineered</span>
              <br />
              <span className="text-slate-800">for Impact.</span>
            </h1>
          </div>
          
          <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <p className="text-xl sm:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              MOZAIC is the AI-enhanced digital studio for ambitious brands. We fuse world-class creative 
              with full-stack development to build the 
              <span className="font-semibold text-slate-800"> campaigns, content, and platforms </span>
              that drive your growth.
            </p>
          </div>
          
          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <button className="btn-primary text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center justify-center space-x-2 group shadow-xl hover:shadow-2xl">
              <span>Get Your Free Growth Blueprint</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-secondary font-semibold text-lg">
              <span className="btn-secondary-inner inline-flex items-center justify-center space-x-2 text-blue-600">
                <Star className="h-5 w-5" />
                <span>Explore Our Work</span>
              </span>
            </button>
          </div>
          
          {/* Enhanced trust indicators */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="flex flex-wrap justify-center items-center gap-6 text-slate-500 mb-8">
              <div className="flex items-center space-x-2 trust-indicator px-4 py-2 rounded-lg">
                <Brain className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-slate-700">A.I. Integrated</span>
              </div>
              
              <div className="hidden sm:block w-px h-6 bg-slate-300"></div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 trust-indicator px-4 py-2 rounded-lg">
                  <Award className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-slate-700">Award-Winning Creative</span>
                </div>
                <div className="flex items-center space-x-2 trust-indicator px-4 py-2 rounded-lg">
                  <Code className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-slate-700">Scalable Tech</span>
                </div>
              </div>
            </div>
            
            {/* Language capabilities */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { code: 'EN', name: 'English', flag: '🇺🇸' },
                { code: 'FR', name: 'Français', flag: '🇫🇷' },
                { code: 'ES', name: 'Español', flag: '🇪🇸' },
                { code: 'AR', name: 'العربية', flag: '🇸🇦' }
              ].map((lang) => (
                <div key={lang.code} className="trust-indicator px-3 py-2 rounded-lg bg-white/40 backdrop-blur-sm border border-slate-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm font-medium text-slate-700">{lang.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Stats preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            {[
              { number: '50+', label: 'Projects Delivered' },
              { number: '15+', label: 'Countries Served' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold gradient-text">{stat.number}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

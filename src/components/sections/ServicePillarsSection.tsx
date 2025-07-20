import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Code, TrendingUp, Bot, Zap, ArrowRight, Sparkles, Star, Award } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const ServicePillarsSection = () => {
  const [ref, isVisible] = useScrollReveal();
  const pillars = [
    {
      icon: Palette,
      name: 'AI-Enhanced Creative Studio',
      slug: 'creative-studio',
      description: 'Transform your brand with AI-powered creative solutions and stunning visual content that converts.',
      color: 'from-purple-500 to-pink-500',
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
      features: ['AI Content Generation', 'Brand Identity', 'Video Production'],
      highlight: 'Most Popular',
      stats: '10x faster content creation'
    },
    {
      icon: Code,
      name: 'Web & Software Development',
      slug: 'development',
      description: 'Custom websites and applications built for performance, security, and scale with modern technologies.',
      color: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      features: ['React/Node.js', 'Cloud Architecture', 'Mobile Apps'],
      stats: '99.9% uptime guarantee'
    },
    {
      icon: TrendingUp,
      name: 'Digital Marketing & Growth',
      slug: 'marketing',
      description: 'Data-driven marketing strategies that convert visitors into loyal customers and scale your business.',
      color: 'from-green-500 to-emerald-500',
      iconBg: 'bg-gradient-to-br from-green-500 to-emerald-500',
      features: ['SEO/SEM', 'Social Media', 'Analytics'],
      stats: '340% average ROI increase'
    },
    {
      icon: Bot,
      name: 'AI, Automation & Empowerment',
      slug: 'automation',
      description: 'Streamline operations with intelligent automation and AI-powered tools that save time and money.',
      color: 'from-orange-500 to-red-500',
      iconBg: 'bg-gradient-to-br from-orange-500 to-red-500',
      features: ['Process Automation', 'AI Integration', 'Workflow Optimization'],
      stats: '60% time savings'
    },
    {
      icon: Zap,
      name: 'Digital Strategy & Consulting',
      slug: 'strategy',
      description: 'Strategic guidance to align your digital presence with business objectives and market opportunities.',
      color: 'from-teal-500 to-blue-500',
      iconBg: 'bg-gradient-to-br from-teal-500 to-blue-500',
      features: ['Strategic Planning', 'Market Analysis', 'Digital Transformation'],
      stats: 'Fortune 500 expertise'
    }
  ];

  return (
    <section 
      ref={ref}
      className={`py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 scroll-reveal-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-6 py-3 mb-6 border border-blue-200">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Complete Digital Ecosystem</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Five Integrated Pillars of
            <span className="gradient-text block">Digital Excellence</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Our comprehensive approach combines cutting-edge technology with strategic thinking 
            to accelerate your business growth across all digital touchpoints
          </p>
        </div>
        
        {/* Enhanced Service Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const isLarge = index === 0; // Make first card larger
            
            return (
              <div 
                key={pillar.slug} 
                className={`service-card bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 relative overflow-hidden group hover:shadow-3xl transition-all duration-500
                  ${isLarge ? 'lg:col-span-2 lg:row-span-1' : ''}
                `}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Highlight badge */}
                {pillar.highlight && (
                  <div className="absolute top-6 right-6 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-current" />
                      <span>{pillar.highlight}</span>
                    </div>
                  </div>
                )}
                
                {/* Background gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with enhanced styling */}
                  <div className={`${pillar.iconBg} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                    {pillar.name}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed text-lg">{pillar.description}</p>
                  
                  {/* Stats highlight */}
                  <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-4 mb-6 border border-blue-100">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-blue-600" />
                      <span className="text-blue-800 font-semibold text-sm">{pillar.stats}</span>
                    </div>
                  </div>
                  
                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {pillar.features.map((feature, featureIndex) => (
                      <span 
                        key={featureIndex}
                        className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <Link 
                    to={`/services/${pillar.slug}`}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-300 group/btn shadow-lg hover:shadow-xl"
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
              </div>
            );
          })}
        </div>
        
        {/* Enhanced integration message */}
        <div className="text-center scroll-reveal">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-12 max-w-4xl mx-auto border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-teal-500 w-12 h-12 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900">
                The Power of Integration
              </h3>
            </div>
            
            <p className="text-slate-600 mb-8 leading-relaxed text-lg max-w-3xl mx-auto">
              Unlike traditional agencies that work in silos, our pillars are designed to work together seamlessly. 
              Your creative content informs your development, your marketing data drives your strategy, 
              and your automation amplifies everything.
            </p>
            
            {/* Integration benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: TrendingUp, title: '3x Faster', desc: 'Delivery speed' },
                { icon: Award, title: '50% Less', desc: 'Coordination overhead' },
                { icon: Sparkles, title: '100%', desc: 'Strategic alignment' }
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-to-br from-blue-100 to-teal-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="font-bold text-2xl gradient-text mb-1">{benefit.title}</div>
                    <div className="text-slate-600 text-sm">{benefit.desc}</div>
                  </div>
                );
              })}
            </div>
            
            <button className="btn-primary text-white px-10 py-4 rounded-xl font-semibold text-lg inline-flex items-center space-x-2 group shadow-xl hover:shadow-2xl">
              <Sparkles className="h-6 w-6" />
              <span>See How They Work Together</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePillarsSection;

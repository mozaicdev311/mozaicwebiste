import React from 'react';
import { ArrowRight, TrendingUp, Clock, DollarSign, Award, Users, Zap, Star } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const CaseStudySection = () => {
  const [ref, isVisible] = useScrollReveal();
  const caseStudies = [
    {
      client: 'TechStart Solutions',
      industry: 'B2B SaaS',
      challenge: 'Needed to launch a new product line with a campaign that felt both premium and authentic.',
      solution: 'AI-Enhanced Creative + Paid Ads',
      result: {
        metric: '+320% Return on Ad Spend in 90 Days',
        icon: TrendingUp,
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      },
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
      timeline: '90 days',
      services: ['AI-Enhanced Creative', 'Paid Advertising']
    },
    {
      client: 'E-Commerce Leader',
      industry: 'Retail',
      challenge: 'Legacy e-commerce site was slow, insecure, and couldn\'t handle traffic spikes.',
      solution: 'Custom Software + AWS Infrastructure',
      result: {
        metric: '-2.1s Load Time, 100% Uptime, +47% Conversion Rate',
        icon: Clock,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      },
      image: 'https://images.pexels.com/photos/3182750/pexels-photo-3182750.jpeg?auto=compress&cs=tinysrgb&w=600',
      timeline: '6 months',
      services: ['Custom Development', 'Cloud Infrastructure']
    },
    {
      client: 'Growing Agency',
      industry: 'Marketing',
      challenge: 'Needed scalable creative production to handle increasing client demands.',
      solution: 'AI Creative Studio + Automation Systems',
      result: {
        metric: '5x Creative Output, 60% Cost Reduction',
        icon: DollarSign,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50'
      },
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600',
      timeline: '4 months',
      services: ['Creative Studio', 'Automation']
    }
  ];

  return (
    <section 
      ref={ref}
      className={`py-20 bg-gradient-to-br from-slate-50 to-white scroll-reveal-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center space-x-2 bg-green-50 rounded-full px-6 py-3 mb-6 border border-green-200">
            <Award className="h-5 w-5 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Proven Results</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Ideas Delivered,
            <span className="gradient-text block">Results Proven.</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            See how forward-thinking companies transformed their digital presence 
            and achieved remarkable growth with MOZAIC's integrated approach
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {caseStudies.map((study, index) => {
            const ResultIcon = study.result.icon;
            return (
              <div 
                key={index} 
                className="case-study-card bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 group"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={study.image} 
                    alt={study.client}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">{study.client}</span>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                        {study.timeline}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">
                      {study.industry}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span className="text-xs text-slate-500">{study.services.length} services</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm font-semibold text-slate-700 mb-2 flex items-center">
                        <Zap className="h-4 w-4 text-orange-500 mr-1" />
                        Challenge:
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold text-slate-700 mb-2">Solution:</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{study.solution}</p>
                    </div>
                  </div>
                  
                  {/* Services used */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {study.services.map((service, serviceIndex) => (
                      <span 
                        key={serviceIndex}
                        className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full font-medium"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  
                  {/* Result highlight */}
                  <div className={`${study.result.bgColor} rounded-xl p-4 mb-6 border border-opacity-20`}>
                    <div className="flex items-center space-x-3">
                      <div className={`${study.result.color.replace('text-', 'bg-')} w-10 h-10 rounded-full flex items-center justify-center`}>
                        <ResultIcon className={`h-5 w-5 text-white`} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Result</p>
                        <p className={`font-bold text-sm ${study.result.color}`}>
                          {study.result.metric}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center justify-center space-x-2 group bg-blue-50 hover:bg-blue-100 py-3 rounded-lg">
                    <span>View the Project</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Enhanced CTA */}
        <div className="text-center scroll-reveal">
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-slate-600 mb-6">
              Join these innovative companies and transform your digital presence with measurable results.
            </p>
            <button className="btn-primary text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center space-x-2 group">
              <Star className="h-5 w-5" />
              <span>See More Success Stories</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;

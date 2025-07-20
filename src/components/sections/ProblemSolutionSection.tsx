import React from 'react';
import { AlertCircle, ArrowRight, CheckCircle, Zap, Users, Clock, Target, TrendingUp, DollarSign, Headphones, Layers } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const ProblemSolutionSection = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section 
      ref={ref}
      className={`py-20 bg-gradient-to-br from-white via-slate-50 to-blue-50 scroll-reveal-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Problem Statement */}
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center space-x-2 bg-red-50 rounded-full px-6 py-3 mb-6 border border-red-200">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-sm font-semibold text-red-700">The Problem</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Fragmented Teams Kill
            <span className="text-red-600 block">Great Ideas</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            You're tired of juggling a creative agency for visuals, a dev shop for your website, 
            and a marketing firm for growth. Each handoff introduces friction, delays, and compromises your vision. 
            <span className="font-semibold text-slate-800"> The final product feels disconnected.</span>
          </p>
        </div>

        {/* Solution Bridge */}
        <div className="text-center mb-20 scroll-reveal">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-teal-600/20"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Layers className="h-5 w-5" />
                <span className="font-semibold">The Integration Layer</span>
              </div>
              
              <h3 className="text-4xl font-bold mb-6">
                We Are the Integration Layer
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                MOZAIC was built to destroy silos. Our multi-axis model provides a single, unified team 
                of creatives, engineers, and strategists. The result is seamless execution, radical efficiency, 
                and a powerful, cohesive brand experience from first sketch to final code.
              </p>
              
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center space-x-2 hover:bg-blue-50 transition-colors">
                <span>See How We Integrate</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Before/After Comparison */}
        <div className="scroll-reveal">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Before vs. After MOZAIC
            </h3>
            <p className="text-lg text-slate-600">See the transformation</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-3xl p-8 relative">
              <div className="absolute top-6 right-6 bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full">
                Before
              </div>
              
              <h4 className="font-bold text-red-900 mb-8 text-xl">Traditional Fragmented Approach</h4>
              
              <div className="space-y-4 mb-8">
                {[
                  { team: 'Creative Agency', status: 'Different brand vision', delay: 'Misaligned' },
                  { team: 'Dev Team', status: 'Waiting for designs', delay: '2 weeks behind' },
                  { team: 'Marketing Agency', status: 'Inconsistent messaging', delay: 'Confused customers' },
                  { team: 'You', status: 'Managing chaos', delay: 'Stressed & overwhelmed' }
                ].map((item, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl border border-red-200 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-700">{item.team}</div>
                        <div className="text-sm text-slate-500">{item.status}</div>
                      </div>
                      <div className="text-red-600 text-sm font-medium">{item.delay}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-red-100 rounded-full px-6 py-3 border border-red-200">
                  <Clock className="h-5 w-5 text-red-600" />
                  <span className="text-red-700 font-medium">Fragmented • Expensive • Slow</span>
                </div>
              </div>
            </div>
            
            {/* After */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-3xl p-8 relative">
              <div className="absolute top-6 right-6 bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-full">
                After
              </div>
              
              <h4 className="font-bold text-green-900 mb-8 text-xl">MOZAIC Integrated Model</h4>
              
              <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 rounded-2xl text-white text-center shadow-2xl mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Zap className="h-6 w-6" />
                  <span className="font-bold text-xl">One MOZAIC Team</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  {['Creative', 'Development', 'Marketing', 'Strategy'].map((service, index) => (
                    <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-2 font-medium">
                      ✓ {service}
                    </div>
                  ))}
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center justify-center space-x-2">
                    <Headphones className="h-4 w-4" />
                    <span className="text-sm font-medium">Single point of contact</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-6 py-3 border border-green-200">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-700 font-medium">Seamless • Efficient • Cohesive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;

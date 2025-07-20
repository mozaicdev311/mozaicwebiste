import React, { useState } from 'react';
import { Building, Rocket, Users, Sparkles, Code, TrendingUp, Bot, Zap } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const MultiAxisSection = () => {
  const [ref, isVisible] = useScrollReveal();
  const [activeIntersection, setActiveIntersection] = useState<string | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{row: number, col: number} | null>(null);

  const services = [
    { name: 'Creative Studio', icon: Sparkles, color: 'bg-purple-500', shortName: 'Creative' },
    { name: 'Development', icon: Code, color: 'bg-blue-500', shortName: 'Dev' },
    { name: 'Marketing', icon: TrendingUp, color: 'bg-green-500', shortName: 'Marketing' },
    { name: 'Automation', icon: Bot, color: 'bg-orange-500', shortName: 'AI/Auto' },
    { name: 'Strategy', icon: Zap, color: 'bg-teal-500', shortName: 'Strategy' }
  ];

  const clientTypes = [
    { name: 'Startup', icon: Rocket, color: 'text-green-600', description: 'MVP to market leader' },
    { name: 'Scale-up', icon: TrendingUp, color: 'text-blue-600', description: 'Growth acceleration' },
    { name: 'Agency', icon: Users, color: 'text-purple-600', description: 'White-label solutions' },
    { name: 'Enterprise', icon: Building, color: 'text-orange-600', description: 'Digital transformation' }
  ];

  const intersectionData: Record<string, {title: string, description: string}> = {
    '0-0': { title: 'Brand Identity + MVP', description: 'Visual identity with rapid prototyping' },
    '0-1': { title: 'Creative Scaling', description: 'Brand systems for growth' },
    '0-2': { title: 'Agency Partnership', description: 'White-label creative services' },
    '0-3': { title: 'Enterprise Branding', description: 'Comprehensive brand systems' },
    '1-0': { title: 'Rapid Development', description: 'Fast MVP development' },
    '1-1': { title: 'Scalable Architecture', description: 'Growth-ready platforms' },
    '1-2': { title: 'Development Partnership', description: 'Extended dev team' },
    '1-3': { title: 'Custom Solutions', description: 'Enterprise-grade systems' },
    '2-0': { title: 'Launch Marketing', description: 'Go-to-market strategy' },
    '2-1': { title: 'Growth Marketing', description: 'Scaling user acquisition' },
    '2-2': { title: 'Marketing Automation', description: 'Agency-level campaigns' },
    '2-3': { title: 'Omnichannel Strategy', description: 'Enterprise marketing' },
    '3-0': { title: 'Process Setup', description: 'Foundational automation' },
    '3-1': { title: 'Growth Automation', description: 'Scaling operations' },
    '3-2': { title: 'Client Automation', description: 'Agency workflow optimization' },
    '3-3': { title: 'Enterprise AI', description: 'Advanced automation systems' },
    '4-0': { title: 'Strategic Foundation', description: 'Business model validation' },
    '4-1': { title: 'Growth Strategy', description: 'Expansion planning' },
    '4-2': { title: 'Partnership Strategy', description: 'Agency collaboration models' },
    '4-3': { title: 'Digital Transformation', description: 'Enterprise strategy consulting' }
  };

  const getIntersectionKey = (serviceIndex: number, clientIndex: number) => `${serviceIndex}-${clientIndex}`;

  const handleCellHover = (serviceIndex: number, clientIndex: number) => {
    const key = getIntersectionKey(serviceIndex, clientIndex);
    setActiveIntersection(key);
    setHoveredCell({ row: serviceIndex, col: clientIndex });
  };

  const handleCellLeave = () => {
    setActiveIntersection(null);
    setHoveredCell(null);
  };

  return (
    <section 
      ref={ref}
      className={`py-20 bg-gradient-to-br from-slate-50 to-blue-50 scroll-reveal-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-6 py-3 mb-6 border border-blue-200">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Multi-Axis System</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Your Business, <span className="gradient-text">Your Way</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Our multi-axis system adapts to your unique needs, creating the perfect combination 
            of services for startups, scale-ups, agencies, and enterprises
          </p>
        </div>
        
        {/* Enhanced Multi-Axis Grid Visualization */}
        <div className="mb-16 scroll-reveal">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-slate-200 relative overflow-visible">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
              <div className="multi-axis-grid w-full h-full"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                Interactive Service Matrix
              </h3>
              
              {/* Grid Container */}
              <div className="overflow-x-auto">
                <div className="min-w-[600px] mx-auto">
                  <div className="grid grid-cols-5 gap-4 mb-4">
                    {/* Empty top-left corner */}
                    <div className="aspect-square"></div>
                    
                    {/* Client Type Headers */}
                    {clientTypes.map((client, index) => {
                      const Icon = client.icon;
                      return (
                        <div key={index} className="aspect-square flex flex-col items-center justify-center p-2 bg-slate-50 rounded-lg border border-slate-200">
                          <Icon className={`h-6 w-6 ${client.color} mb-2`} />
                          <span className="text-sm font-semibold text-slate-700 text-center leading-tight">
                            {client.name}
                          </span>
                          <span className="text-xs text-slate-500 text-center mt-1">
                            {client.description}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Service Rows */}
                  {services.map((service, serviceIndex) => {
                    const ServiceIcon = service.icon;
                    return (
                      <div key={serviceIndex} className="grid grid-cols-5 gap-4 mb-4">
                        {/* Service Label */}
                        <div className="aspect-square flex flex-col items-center justify-center p-2 bg-slate-50 rounded-lg border border-slate-200">
                          <div className={`${service.color} w-8 h-8 rounded-lg flex items-center justify-center mb-2`}>
                            <ServiceIcon className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm font-semibold text-slate-700 text-center leading-tight">
                            {service.shortName}
                          </span>
                        </div>
                        
                        {/* Intersection Cells */}
                        {clientTypes.map((_, clientIndex) => {
                          const key = getIntersectionKey(serviceIndex, clientIndex);
                          const isActive = activeIntersection === key;
                          const isHighlighted = hoveredCell && 
                            (hoveredCell.row === serviceIndex || hoveredCell.col === clientIndex);
                          
                          return (
                            <div
                              key={clientIndex}
                              className={`matrix-cell bg-slate-50 border-2 cursor-pointer relative transition-all duration-300
                                ${isActive ? 'border-blue-500 bg-blue-50 scale-110 z-20' : 'border-slate-200'}
                                ${isHighlighted ? 'border-slate-300 bg-slate-100' : ''}
                                hover:border-blue-400 hover:bg-blue-50 hover:scale-105
                              `}
                              onMouseEnter={() => handleCellHover(serviceIndex, clientIndex)}
                              onMouseLeave={handleCellLeave}
                            >
                              <div className={`w-3 h-3 rounded-full transition-all duration-300 mx-auto
                                ${isActive ? 'bg-blue-500 scale-150' : 'bg-slate-400 scale-100'}
                                ${isHighlighted ? 'bg-slate-500 scale-125' : ''}
                              `}></div>
                              
                              {/* Hover tooltip - Fixed positioning */}
                              {isActive && intersectionData[key] && (
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-30">
                                  <div className="bg-slate-900 text-white p-4 rounded-xl shadow-2xl min-w-56 text-center border border-slate-700">
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                                    <p className="font-bold text-sm mb-2 text-blue-200">
                                      {intersectionData[key].title}
                                    </p>
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                      {intersectionData[key].description}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Client Type Examples with Enhanced Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 scroll-reveal">
          {clientTypes.map((client, index) => {
            const Icon = client.icon;
            return (
              <div key={client.name} className="gradient-border interactive-element">
                <div className="gradient-border-inner text-center h-full">
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className={`h-8 w-8 ${client.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{client.name}</h3>
                  <p className="text-slate-600 mb-4">{client.description}</p>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-3 border border-blue-100">
                    <p className="text-xs text-slate-500 mb-1">Popular Combination:</p>
                    <p className="font-semibold text-blue-700 text-sm">
                      {index === 0 && "Creative + Development"}
                      {index === 1 && "Marketing + Automation"}
                      {index === 2 && "Development + Strategy"}
                      {index === 3 && "Strategy + Custom Solutions"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Enhanced CTA Section */}
        <div className="text-center scroll-reveal">
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto border border-slate-200">
            <p className="text-slate-700 mb-6 text-lg">
              Not sure which combination is right for you?
            </p>
            <button className="btn-primary text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span>Get Personalized Recommendations</span>
            </button>
            <p className="text-sm text-slate-500 mt-4">
              Free 30-minute strategy session • No commitment required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultiAxisSection;

import React from 'react';
import { Brain, Code, TrendingUp, Globe, Award, Star, Linkedin, Video, Zap } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const TeamSection = () => {
  const [ref, isVisible] = useScrollReveal();
  const teamMembers = [
    {
      name: 'Oussama',
      role: 'Growth Architect & Full-Stack Engineer',
      description: 'Turns big ideas into high-performance digital products and growth engines.',
      skills: ['Full-Stack Development', 'Growth Strategy', 'System Architecture'],
      achievement: 'Built scalable systems serving 1M+ users',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
      personality: 'Transforms complex technical challenges into elegant, scalable solutions',
      rating: 4.9,
      projects: 62,
      specialties: ['React/Node.js', 'Cloud Architecture', 'Growth Engineering']
    },
    {
      name: 'Tawfik',
      role: 'Creative Director & Filmmaker',
      description: 'Crafts compelling brand narratives and stunning visuals that capture attention and emotion.',
      skills: ['Brand Strategy', 'Video Production', 'Creative Direction'],
      achievement: 'Created viral campaigns with 50M+ views',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400',
      personality: 'Bridges the gap between artistic vision and commercial impact',
      rating: 4.8,
      projects: 47,
      specialties: ['Brand Films', 'Creative Strategy', 'Visual Storytelling']
    },
    {
      name: 'Med Amine',
      role: 'Cloud & Software Engineer',
      description: 'Engineers robust, scalable, and secure infrastructures that power enterprise-level applications.',
      skills: ['Cloud Architecture', 'DevOps', 'Security'],
      achievement: 'Designed systems handling 10M+ daily transactions',
      image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400',
      personality: 'Perfectionist who makes complex systems elegantly simple and secure',
      rating: 4.9,
      projects: 38,
      specialties: ['AWS/Azure', 'Microservices', 'Security']
    }
  ];

  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸', proficiency: 'Native' },
    { code: 'FR', name: 'Français', flag: '🇫🇷', proficiency: 'Fluent' },
    { code: 'ES', name: 'Español', flag: '🇪🇸', proficiency: 'Fluent' },
    { code: 'AR', name: 'العربية', flag: '🇸🇦', proficiency: 'Native' }
  ];

  const teamStats = [
    { number: '150+', label: 'Combined Years Experience' },
    { number: '200+', label: 'Projects Completed' },
    { number: '15+', label: 'Countries Served' },
    { number: '4.9/5', label: 'Average Client Rating' }
  ];

  return (
    <section 
      ref={ref}
      className={`py-20 bg-gradient-to-br from-white to-slate-50 scroll-reveal-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center space-x-2 bg-purple-50 rounded-full px-6 py-3 mb-6 border border-purple-200">
            <Award className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">Expert Team</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            The Minds in the
            <span className="gradient-text block">Mosaic.</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            We are a collective of senior-level strategists, creators, and engineers 
            united by a passion for building beautiful, functional things.
          </p>
        </div>
        
        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 scroll-reveal">
          {teamStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 interactive-element">
                <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Team Members */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="team-card bg-white rounded-2xl p-8 shadow-xl border border-slate-200 group"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full mx-auto overflow-hidden ring-4 ring-slate-100 group-hover:ring-blue-200 transition-all">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white rounded-full p-2 shadow-lg border border-slate-200">
                    <Linkedin className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{member.description}</p>
                
                {/* Rating and projects */}
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-slate-700">{member.rating}</span>
                  </div>
                  <div className="w-px h-4 bg-slate-300"></div>
                  <div className="text-sm text-slate-600">
                    <span className="font-semibold">{member.projects}</span> projects
                  </div>
                </div>
              </div>
              
              {/* Skills */}
              <div className="mb-6">
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {member.specialties.map((specialty, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="bg-gradient-to-r from-blue-50 to-teal-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Achievement */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-4 border border-green-200">
                <div className="flex items-start space-x-2">
                  <Award className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="font-semibold text-green-900 text-sm leading-relaxed">{member.achievement}</p>
                </div>
              </div>
              
              {/* Personality */}
              <p className="text-slate-600 text-sm italic text-center leading-relaxed">
                "{member.personality}"
              </p>
            </div>
          ))}
        </div>
        
        {/* Language Capabilities */}
        <div className="scroll-reveal">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center justify-center space-x-2">
                <Globe className="h-6 w-6 text-blue-600" />
                <span>Global Communication Excellence</span>
              </h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                We serve clients worldwide in their preferred language, ensuring clear communication 
                and cultural understanding throughout every project
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {languages.map((lang) => (
                <div key={lang.code} className="interactive-element bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 text-center border border-slate-200">
                  <div className="text-4xl mb-3">{lang.flag}</div>
                  <h4 className="font-bold text-slate-900 mb-1">{lang.name}</h4>
                  <p className="text-slate-500 text-sm mb-2">{lang.code}</p>
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                    {lang.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

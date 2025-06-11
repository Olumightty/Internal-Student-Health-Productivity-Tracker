import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Shield, Calendar, ArrowRight, BookOpen, Target, Heart } from 'lucide-react';
import { useAuthContext } from './AuthenticationContext';

const NotSignedIn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  const {signIn} = useAuthContext()

  const stats = [
    { number: '2,500+', label: 'Students Tracking', icon: Users },
    { number: '15,000+', label: 'Daily Logs', icon: Calendar },
    { number: '95%', label: 'Success Rate', icon: TrendingUp },
    { number: '100%', label: 'Secure & Private', icon: Shield }
  ];

  const features = [
    { icon: BookOpen, title: 'Track Learning', desc: 'Log daily progress and achievements' },
    { icon: Heart, title: 'Monitor Wellbeing', desc: 'Keep track of your mental health' },
    { icon: Target, title: 'Identify Blockers', desc: 'Spot and overcome obstacles early' }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-150"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {/* <div className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Neo-Cloud Tracker</span>
          </div>
          <div className="hidden md:flex space-x-6 text-white/80">
            <span className="hover:text-white cursor-pointer transition-colors">Dashboard</span>
            <span className="hover:text-white cursor-pointer transition-colors">Analytics</span>
            <span className="hover:text-white cursor-pointer transition-colors">Support</span>
          </div>
        </div> */}

        {/* Hero Section */}
        <div className="py-20 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Track Your
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent block">
                Learning Journey
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Empower your growth with our comprehensive productivity tracker. Monitor your learning progress, 
              identify blockers, and maintain your wellbeing throughout your Neo-Cloud journey.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button onClick={() => signIn()} className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get Productive
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                View Demo
              </button>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index}
                    className={`p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 transition-all duration-500 hover:bg-white/20 hover:scale-105 ${
                      currentStat === index ? 'ring-2 ring-cyan-400 bg-white/20' : ''
                    }`}
                  >
                    <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index}
                    className={`p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-white/70">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pb-20">
          <div className="inline-flex items-center space-x-2 text-white/60 text-sm">
            <Shield className="w-4 h-4" />
            <span>Your data is secure and private</span>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-10 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
      <div className="absolute top-1/3 left-20 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-300"></div>
      <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-pink-400 rounded-full animate-ping delay-700"></div>
    </div>
  );
};

export default NotSignedIn;
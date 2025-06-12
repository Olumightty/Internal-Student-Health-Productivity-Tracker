import React from 'react';
import { BarChart3, BookOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignedIn = () => {
    const nav = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      {/* <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900">StudentTracker</span>
        </div>
      </nav> */}

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Track Your
            <br />
            <span className="text-blue-600">Learning Progress</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Monitor your daily productivity, log your learning achievements, 
            and stay on top of your Neo-Cloud journey.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => nav('/dashboard')} className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-200 flex items-center justify-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Dashboard
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button onClick={() => nav('/insights')} className="group border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-lg font-medium text-lg transition-all duration-200 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Insights
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Simple Feature Highlight */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Daily Logging</h3>
            <p className="text-gray-600 text-sm">Track your learning progress and achievements</p>
          </div>
          
          <div className="p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Progress Insights</h3>
            <p className="text-gray-600 text-sm">Visualize your growth over time</p>
          </div>
          
          <div className="p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Identify Blockers</h3>
            <p className="text-gray-600 text-sm">Spot and overcome obstacles early</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignedIn;
import axios from "axios";
import { AlertTriangle, BookOpen, Calendar, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useAuthContext } from "./AuthenticationContext";

const DailyLogForm = () => {
    const {user} = useAuthContext()

    const [formData, setFormData] = useState({
      productivity: '',
      feedback:  '',
      blockers: ''
    });
    const [loading, setLoading] = useState(false);
  
    const today = new Date().toISOString().split('T')[0];
    // const isEditing = !!todaysEntry;
  
    const handleSubmit = async(e) => {
      setLoading(true);
      e.preventDefault();
      // Handle form submission
    //   onSubmit({ ...formData, date: today });
      try {
        const request = await axios.post(import.meta.env.VITE_API_GATEWAY_URL, {
          userId: user.profile.sub,
          productivity: formData.productivity,
          feedback: formData.feedback,
          blockers: formData.blockers
        });

        const response = request.data;
        alert(response.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
      } catch (error) {
        console.error('Error submitting daily log:', error);
      }finally{
        setLoading(false);
      }
    };
  
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Daily Log - {new Date(today).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
            <p className="text-gray-600">
              {'Record your daily progress and feedback'}
            </p>
          </div>
        </div>
  
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <BookOpen className="h-4 w-4 text-blue-500" />
              <span>What did you learn/accomplish today?</span>
            </label>
            <textarea
              value={formData.productivity}
              onChange={(e) => setFormData({...formData, productivity: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              rows="4"
              placeholder="e.g., Learned about Auto Scaling and Load Balancing, completed hands-on lab..."
              required
            />
          </div>
  
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <MessageSquare className="h-4 w-4 text-green-500" />
              <span>Feedback on today's class/content</span>
            </label>
            <textarea
              value={formData.feedback}
              onChange={(e) => setFormData({...formData, feedback: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              rows="3"
              placeholder="e.g., Great session, would love more practical examples..."
              required
            />
          </div>
  
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span>Any blockers or challenges?</span>
            </label>
            <textarea
              value={formData.blockers}
              onChange={(e) => setFormData({...formData, blockers: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              rows="3"
              placeholder="e.g., Had trouble with IAM permissions, need help with Lambda deployment..."
            />
          </div>
  
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Calendar className="h-5 w-5" />
            <span>{'Save Your Entry'}</span>
          </button>
        </form>
      </div>
    );
  };

  export default DailyLogForm;
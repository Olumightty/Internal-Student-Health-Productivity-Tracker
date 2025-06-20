import { BookOpen, LogIn, User, UserPlus } from "lucide-react";
import { NavLink} from "react-router-dom";
import { useAuthContext } from "./AuthenticationContext";

const Header = () => {
  const {signOut, user, signIn, isAuthenticated} = useAuthContext()
    
    return (
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 sticky  top-0 left-0 shadow-2xl z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Neo-Cloud Tracker</h1>
                <p className="text-blue-100 text-sm">Student Health & Productivity</p>
              </div>
            </div>
            
            {user && isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
                  <User className="h-4 w-4 text-white" />
                  <span className="text-white font-medium">{user.profile['cognito:username']}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : 
            (
              <div className="flex items-center space-x-4">
                <NavLink
                  onClick={() => signIn()}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </NavLink>
              </div>
            )
            
            }
          </div>
        </div>
      </header>
    );
  };

  export default Header;
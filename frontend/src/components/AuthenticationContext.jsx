import { createContext, useContext } from "react";
import { useAuth } from "react-oidc-context";
import { useLocation } from "react-router-dom";
import CustomLoader from "./CustomLoader";

export const AuthenticationContext = createContext({
    user: null,
    isAuthenticated: false,
    signIn: () => {},
    signOut: () => {},
});

export const AuthenticationProvider = ({ children }) => {
  const path = useLocation().pathname
  const {isAuthenticated, user, isLoading, error, signinRedirect, removeUser} = useAuth()
  

  const signOut = () => {
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    const logoutUri = import.meta.env.VITE_APP_MODE == "production" ? import.meta.env.VITE_COGNITO_REDIRECT_URI: "http://localhost:5173/";
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
    removeUser()
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };


  if (isLoading) {
    return <CustomLoader/>
  }

  if (error) {
    return <div>Encountering error... {error.message}</div>;
  }

  if (!isLoading && !isAuthenticated && path != "/") {
    //do a redirect back to the home page
    window.location.href = import.meta.env.VITE_APP_MODE == "production" ? import.meta.env.VITE_APP_URL: "http://localhost:5173/";
    return <div className="text-lg text-red-500 font-semibold">Not Authenticated</div>;
  }

  

  

  

  return (
    <AuthenticationContext.Provider value={{ user, signOut, signIn: signinRedirect, isAuthenticated  }}>
      {children}
    </AuthenticationContext.Provider>
  );
};


export const useAuthContext = () => useContext(AuthenticationContext);
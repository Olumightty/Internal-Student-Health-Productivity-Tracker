import { createContext, useContext } from "react";
import { useAuth } from "react-oidc-context";

export const AuthenticationContext = createContext({
    user: null,
    isAuthenticated: false,
    signIn: () => {},
    signOut: () => {},
});

export const AuthenticationProvider = ({ children }) => {
  const {isAuthenticated, user, isLoading, error, signinRedirect, removeUser} = useAuth()

  const signOut = () => {
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    const logoutUri = import.meta.env.VITE_APP_MODE == "production" ? import.meta.env.VITE_COGNITO_REDIRECT_URI: "http://localhost:5173/";
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;
    removeUser()
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Encountering error... {error.message}</div>;
  }

  if (!isAuthenticated && window.location.href !== "http://localhost:5173/") {

    window.location.href = "http://localhost:5173/";
    return <div className="text-lg text-red-500 font-semibold">Not Authenticated</div>;
  }

  

  return (
    <AuthenticationContext.Provider value={{ user, signOut, signIn: signinRedirect, isAuthenticated  }}>
      {children}
    </AuthenticationContext.Provider>
  );
};


export const useAuthContext = () => useContext(AuthenticationContext);
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
    const clientId = "sq6h8aabdio1d5l6lac0ms9ds";
    const logoutUri = "http://localhost:5173/";
    const cognitoDomain = "https://health-prod-auth-domain.auth.us-east-1.amazoncognito.com";
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
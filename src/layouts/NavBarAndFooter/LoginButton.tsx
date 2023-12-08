import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = () => {
    const scopes = ["openid", "profile", "email"];

    loginWithRedirect({
      // @ts-ignore: Ignore type error for the 'scope' property
      scope: scopes.join(" "), // Convert array to space-separated string
    });
  };

  return !isAuthenticated ? (
    <button onClick={() => handleLogin()} className="btn btn-primary">
      Sign In
    </button>
  ) : null;
};

export default LoginButton;

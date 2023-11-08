import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return !isAuthenticated ? (
    <button onClick={() => loginWithRedirect()} className="btn btn-primary">
      Sign In
    </button>
  ) : null;
};

export default LoginButton;

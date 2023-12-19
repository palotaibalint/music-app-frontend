import React, { useCallback, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import debounce from "lodash/debounce";

const LoginButton: React.FC = () => {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, user } =
    useAuth0();
  const [attemptedToAddUser, setAttemptedToAddUser] = useState(false);

  const checkUserExists = useCallback(async () => {
    if (!user) return false;

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: "https://music-api",
          scope: "openid profile email",
        },
      });
      const response = await fetch(
        `http://localhost:8081/api/users/private/check?userEmail=${user.nickname}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to check user existence");
      const exists = await response.json();
      return exists;
    } catch (error) {
      console.error("Error checking if user exists:", error);
      return false;
    }
  }, [user, getAccessTokenSilently]);

  const addUserToBackend = useCallback(async () => {
    if (attemptedToAddUser || !user) return;

    const userExists = await checkUserExists();
    if (userExists) return;

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: "https://music-api",
          scope: "openid profile email",
        },
      });

      await fetch(
        `http://localhost:8081/api/users/private/add?userName=${user.nickname}&userEmail=${user.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Error adding user to backend:", error);
    } finally {
      setAttemptedToAddUser(true);
    }
  }, [user, attemptedToAddUser, getAccessTokenSilently, checkUserExists]);

  const debouncedAddUserToBackend = useCallback(
    debounce(() => {
      if (isAuthenticated && user && !attemptedToAddUser) {
        addUserToBackend();
      }
    }, 1000),
    [isAuthenticated, user, attemptedToAddUser, addUserToBackend]
  );

  useEffect(() => {
    debouncedAddUserToBackend();
    return () => {
      debouncedAddUserToBackend.cancel();
    };
  }, [debouncedAddUserToBackend]);

  const handleLogin = () => {
    loginWithRedirect();
  };

  return !isAuthenticated ? (
    <button onClick={handleLogin} className="btn btn-primary">
      Sign In
    </button>
  ) : null;
};

export default LoginButton;

"use client";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AuthContextProps,
  UserData,
  User,
  CreditsData,
} from "../../auth_types";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthContextProvider = (props: PropsWithChildren) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [creditsData, setCreditsData] = useState<CreditsData | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Session", session);
      if (session?.user) {
        if (session.user.email && session.user.name && session.user.id) {
          console.log("User", session.user);
          checkAndCreateUserData(session.user);
        }
      }
    }
  }, [session, status]);

  const checkAndCreateUserData = async (user: User) => {
    if (userData) return;

    let user_data_set = false;

    try {
      const userExistsResponse = await fetch("/api/user/read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_uid: user.id }),
      });

      if (userExistsResponse.ok) {
        const userData = await userExistsResponse.json();
        console.log("User data exists", userData);
        setUserData(userData);
        user_data_set = true;
      } else {
        console.log("User data does not exist, creating...");
        const createUserResponse = await fetch("/api/user/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ session_user: user }),
        });

        if (createUserResponse.ok) {
          const userData = await createUserResponse.json();
          console.log("User data created", userData);
          setUserData(userData);
          user_data_set = true;
        } else {
          console.error("Error creating user data");
        }
      }
    } catch (error) {
      console.error("Error creating user data", error);
    }

    if (!user_data_set) {
      setLoginError("Error creating user data");
    } else {
      const creditsExistsResponse = await fetch("/api/credits/read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_uid: user.id }),
      });
      if (creditsExistsResponse.ok) {
        const creditsRes = await creditsExistsResponse.json();
        console.log("Credits exists", creditsRes.creditsData);
        setCreditsData(creditsRes.creditsData);
      } else {
        console.log("Credits does not exist, creating...");
        const createCreditsResponse = await fetch("/api/credits/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_uid: user.id }),
        });

        if (createCreditsResponse.ok) {
          const credits = await createCreditsResponse.json();
          console.log("Credits created", credits);
          setCreditsData(credits);
        } else {
          console.error("Error creating credits");
        }
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        creditsData,
        loginError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context || context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

export default AuthContextProvider;

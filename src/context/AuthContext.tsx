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
import { db } from "@/config/firebaseClientConfig";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthContextProvider = (props: PropsWithChildren) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [creditsData, setCreditsData] = useState<CreditsData | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
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
  const checkAccessStatus = async (
    email: string
  ): Promise<"unknown" | "pending" | "approved" | "denied"> => {
    try {
      const accessRef = query(
        collection(db, "accessRequests"),
        where("email", "==", email)
      );

      const snapshot = await getDocs(accessRef);

      if (snapshot.empty) {
        return "unknown";
      }

      const accessDoc = snapshot.docs[0].data();
      return accessDoc.status;
    } catch (error) {
      console.error("Error checking access status:", error);
      throw error;
    }
  };

  const requestAccess = async (email: string, displayName: string) => {
    try {
      console.log("Requesting access for:", email);

      // Check if a request already exists
      const accessRef = query(
        collection(db, "accessRequests"),
        where("email", "==", email)
      );

      console.log("Checking for existing request...");
      const snapshot = await getDocs(accessRef);

      if (!snapshot.empty) {
        // Request already exists, just return current status
        console.log(
          "Existing request found with status:",
          snapshot.docs[0].data().status
        );
        return snapshot.docs[0].data().status;
      }

      console.log("No existing request, creating new request...");
      const requestData = {
        email,
        displayName,
        requestedAt: serverTimestamp(),
        status: "pending",
        ipAddress: "",
        userAgent: navigator.userAgent || "",
        reason: "",
      };

      await addDoc(collection(db, "accessRequests"), requestData);
      console.log("Access request created successfully!");
      return "pending";
    } catch (error) {
      console.error("Error requesting access:", error);
      // Log more details about the error to help debug
      if (error instanceof Error) {
        console.error("Error details:", {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
      }
      throw error;
    }
  };
  const checkAndCreateUserData = async (user: User) => {
    // Add a check to prevent multiple simultaneous calls
    if (userData) return;

    // Add this flag to track if we're currently processing

    if (isProcessing) return;

    setIsProcessing(true);
    let user_data_set = false;

    try {
      // Ensure user.id exists before making the request
      if (!user?.id) {
        console.error("No user ID available for API call");
        setIsProcessing(false);
        return;
      }

      console.log("Checking user data with ID:", user.id);

      try {
        const userExistsResponse = await fetch("/api/user/read", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_uid: user.id }),
        });
        console.log("Response status:", userExistsResponse.status);

        if (userExistsResponse.ok) {
          const userData = await userExistsResponse.json();
          console.log("User data exists", userData);
          setUserData(userData);
          user_data_set = true;
        } else {
          // Get error details
          const errorDetails = await userExistsResponse
            .json()
            .catch(() => ({}));
          console.error("Error response:", errorDetails);

          if (userExistsResponse.status === 404) {
            // Only create if the user wasn't found (404)
            console.log("User data does not exist, creating...");
            const createUserResponse = await fetch("/api/user/create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.user?.id || ""}`,
              },
              body: JSON.stringify({
                session_user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  image: user.image,
                },
              }),
            });

            if (createUserResponse.ok) {
              const userData = await createUserResponse.json();
              console.log("User data created", userData);
              setUserData(userData);
              user_data_set = true;
            } else {
              console.error(
                "Error creating user data:",
                await createUserResponse.text()
              );
            }
          } else {
            // For other status codes, log the error details
            const errorText = await userExistsResponse.text();
            console.error(
              "Error checking user data:",
              userExistsResponse.status,
              errorText
            );
          }
        }
      } catch (error) {
        console.error("Network error in user data operations:", error);
      }

      // Credits check and creation
      if (user_data_set) {
        try {
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
              console.error(
                "Error creating credits:",
                await createCreditsResponse.text()
              );
            }
          }
        } catch (error) {
          console.error("Network error in credits operations:", error);
        }
      }
    } catch (error) {
      console.error("Error in checkAndCreateUserData:", error);
    } finally {
      // Set error if needed
      if (!user_data_set) {
        setLoginError("Error creating user data");
      }

      // Always reset processing flag
      setIsProcessing(false);
    }
  };

  const setNewCredits = async (newCredits: number) => {
    if (!userData) return;
    const response = await fetch("/api/credits/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_uid: session?.user.id,
        newCredits,
      }),
    });
    if (response.ok) {
      const credits = await response.json();
      console.log("Credits updated", credits);
      setCreditsData(credits);
    } else {
      console.error("Error updating credits");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        creditsData,
        loginError,
        setNewCredits,
        checkAccessStatus,
        requestAccess,
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

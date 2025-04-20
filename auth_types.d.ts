import { CreditsData } from "./auth_types.d";
import { FieldValue } from "firebase/firestore";

export interface User {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

export interface UserData {
  email: string | null;
  image: string | null;
  displayName: string | null;
  role: "admin" | "user" | null;
  firstName: string;
  lastName: string;
  lastLogin: FieldValue;
  updatedAt: FieldValue;
}

export interface AuthContextProps {
  userData: UserData | null;
  creditsData: CreditsData | null;
  loginError: string | null;
  setNewCredits: (credits: number) => void;
  checkAccessStatus: (
    email: string
  ) => Promise<"unknown" | "pending" | "approved" | "denied">;
  requestAccess: (
    email: string,
    displayName: string
  ) => Promise<"pending" | "approved" | "denied">;
  requestAccess;
}

export interface CreditsData {
  credits: number;
  maxCredits: number;
  updatedAt: FieldValue;
}

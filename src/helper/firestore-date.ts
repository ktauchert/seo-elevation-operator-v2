import { FieldValue } from "firebase/firestore";
import { Timestamp } from "firebase-admin/firestore";

// Complete type for all possible date representations
export type FirestoreDateValue =
  | {
      _seconds: number;
      _nanoseconds: number;
    }
  | {
      seconds: number;
      nanoseconds: number;
    }
  | Timestamp
  | Date
  | string
  | FieldValue
  | null;

const formatFirestoreDate = (dateValue: FirestoreDateValue): string => {
  // Handle null or undefined
  if (!dateValue) {
    return "not available";
  }

  // Handle string dates
  if (typeof dateValue === "string") {
    return new Date(dateValue).toLocaleDateString("de-DE");
  }

  // Handle Firestore Timestamp objects from client SDK
  if (typeof dateValue === "object" && "_seconds" in dateValue) {
    const date = new Date(
      dateValue._seconds * 1000 + (dateValue._nanoseconds || 0) / 1e6
    );
    return date.toLocaleDateString("de-DE");
  }

  // Handle Firestore Timestamp objects from admin SDK
  if (typeof dateValue === "object" && "seconds" in dateValue && "nanoseconds" in dateValue) {
    const date = new Date(
      dateValue.seconds * 1000 + (dateValue.nanoseconds || 0) / 1e6
    );
    return date.toLocaleDateString("de-DE");
  }

  // Handle JavaScript Date objects
  if (dateValue instanceof Date) {
    return dateValue.toLocaleDateString("de-DE");
  }

  // Handle FieldValue (which can't be formatted directly)
  // This typically only happens on the client-side before data is sent to Firestore
  if (typeof dateValue === "object" && "isEqual" in dateValue) {
    return "pending";
  }

  // Fallback
  return "not available";
};

// Add a new function for more detailed formatting including time
export const formatFirestoreDateWithTime = (dateValue: FirestoreDateValue): string => {
  // Handle null or undefined
  if (!dateValue) {
    return "not available";
  }

  // Handle string dates
  if (typeof dateValue === "string") {
    return new Date(dateValue).toLocaleString("de-DE");
  }

  // Handle Firestore Timestamp objects from client SDK
  if (typeof dateValue === "object" && "_seconds" in dateValue) {
    const date = new Date(
      dateValue._seconds * 1000 + (dateValue._nanoseconds || 0) / 1e6
    );
    return date.toLocaleString("de-DE");
  }

  // Handle Firestore Timestamp objects from admin SDK
  if (typeof dateValue === "object" && "seconds" in dateValue && "nanoseconds" in dateValue) {
    const date = new Date(
      dateValue.seconds * 1000 + (dateValue.nanoseconds || 0) / 1e6
    );
    return date.toLocaleString("de-DE");
  }

  // Handle JavaScript Date objects
  if (dateValue instanceof Date) {
    return dateValue.toLocaleString("de-DE");
  }

  // Handle FieldValue (which can't be formatted directly)
  if (typeof dateValue === "object" && "isEqual" in dateValue) {
    return "pending";
  }

  // Fallback
  return "not available";
};

export default formatFirestoreDate;
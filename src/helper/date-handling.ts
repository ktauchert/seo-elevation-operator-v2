import { Timestamp, FieldValue } from "firebase-admin/firestore";
import admin from "firebase-admin";

// Function to create a server timestamp
export const createServerTimestamp = (): FieldValue => {
  return admin.firestore.FieldValue.serverTimestamp();
};

// Function to serialize a Timestamp for API responses
export const serializeTimestamp = (timestamp: Timestamp | undefined | null) => {
  if (!timestamp) return null;
  
  return {
    _seconds: timestamp.seconds,
    _nanoseconds: timestamp.nanoseconds
  };
};

// Function to add timestamps to a new document
export const addTimestampsToNewDocument = <T>(data: T): T & { 
  createdAt: FieldValue; 
  updatedAt: FieldValue 
} => {
  const timestamp = createServerTimestamp();
  
  return {
    ...data,
    createdAt: timestamp,
    updatedAt: timestamp
  };
};

// Function to add update timestamp to an existing document
export const addUpdateTimestamp = <T>(data: T): T & { 
  updatedAt: FieldValue 
} => {
  return {
    ...data,
    updatedAt: createServerTimestamp()
  };
};
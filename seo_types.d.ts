import { FieldValue, Timestamp } from "firebase-admin/firestore";
export interface Extraction {
  title: string;
  metaDescription?: string;
  headings: string[];
  images: string[];
  wordCount: number;
  internalLinks: string[];
  externalLinks: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  robots?: string;
  viewport?: string;
}
export interface SEOScoring {
  title: number;
  metaDescription: number;
  headings: number;
  altText: number;
  wordCount: number;
  internalLinks: number;
  externalLinks: number;
  openGraph: number;
  canonicalUrl: number;
  robotsTag: number;
  viewport: number;
  performance: number;
  overallScore: number;
}

export interface ElevationResultData {
  id: string;
  url: string;
  overallScore: number;
  updatedAt: Date;
  result: string;
  scoring: SEOScoring;
}

// getData response
export interface GetDataResponse {
  data: any;
  message: string;
  success: boolean;
}


// This file helps clarify the types for server-side Firebase Admin operations



// For when writing to Firestore (can be a server timestamp)
export type WriteTimestamp = FieldValue | Timestamp | Date | null;

// For when reading from Firestore (will be a Timestamp)
export type ReadTimestamp = Timestamp | null;

// Common Firestore document with timestamps
export interface FirestoreDocumentWithTimestamps {
  createdAt?: WriteTimestamp | ReadTimestamp;
  updatedAt?: WriteTimestamp | ReadTimestamp;
}

// For API responses that convert Firestore timestamps to serializable format
export type SerializedTimestamp = {
  _seconds: number;
  _nanoseconds: number;
};
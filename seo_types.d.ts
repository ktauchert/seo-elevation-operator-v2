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



// getData response
export interface GetDataResponse {
  data: any;
  message: string;
  success: boolean;
}



# SEO Elevation Operator - Copilot Instructions

## Project Overview

SEO Elevation Operator is a Next.js application designed to analyze and improve website SEO performance. The application includes user management, SEO analysis tools, and result tracking functionality.

## Architecture and Key Components

### Frontend

- Built with Next.js App Router (`/src/app/`)
- UI components in `/src/components/`
- Context providers in `/src/context/` (key ones: `AuthContext.tsx` and `SEOContext.tsx`)

### Backend (API Routes)

- API endpoints in `/src/app/api/` organized by domain
- Authentication: `api/auth/[...nextauth]`
- SEO functionality: `api/seo/*`
- User management: `api/user/*`

### Key Workflows

#### SEO Analysis Process

1. User submits URL through the frontend (managed by `SEOContext.tsx`)
2. System makes API calls to the following endpoints in sequence:
   - `api/seo/scraper` - Extracts raw HTML using Puppeteer
   - `api/seo/extractor` - Parses HTML for SEO-relevant elements
   - `api/seo/speed` - Gets performance metrics
   - `api/seo/openai` - Generates analysis using prompts from `src/prompts/seoPrompts.ts`
3. Results are stored in Firebase Firestore

#### Puppeteer Integration (Important)

- The codebase uses a dual-approach to Puppeteer depending on environment:
  - In development: Standard Puppeteer package
  - In production (Vercel): `@sparticuz/chromium` with fallback to fetch
- See `src/app/api/seo/scraper/route.ts` for implementation details

### Data Flow

- Authentication data flows through NextAuth.js integration
- User data stored in Firebase Firestore
- SEO results stored in user-specific collections

## Developer Setup & Commands

```bash
# Development
npm run dev

# Production build (includes special Chromium setup for Vercel)
npm run vercel-build
```

## Project-Specific Patterns

### Authentication

- Uses NextAuth.js with both Google and Credentials providers
- Firebase Auth for actual authentication
- Custom session handling in `src/lib/auth.tsx`

### SEO Analysis

- Extraction logic uses a combination of Puppeteer and Cheerio
- OpenAI integration for generating analysis and recommendations
- Scoring system defined in `seoPrompts.ts`

### Serverless Function Optimization

- Uses `maxDuration` property in route handlers that need extended runtime
- Implements fallback mechanisms for browser-based operations

## Common Pitfalls

- Puppeteer operations may time out in serverless environments
- Always handle authentication state transitions carefully
- Check for user permissions before data operations

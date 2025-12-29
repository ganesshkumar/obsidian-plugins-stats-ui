/* istanbul ignore file */

export interface Post {
  id: string;
  title: string;
  description?: string;
  excerpt?: string;
  publishedDate: string;
  modifiedDate: string;
  ogImage?: string;
  bannerImage?: string;
  tags?: string[];
  plugins?: string[];
  contentHtml?: string;
  content: string;
  authors?: string[];
}

export interface Author {
  slug: string;
  name: string;
  title?: string;
  bio: string;
  avatar?: string;
  social?: {
    website?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
  questions?: Record<string, string>;
}

export interface Highlight {
  title: string;
  image: string;
  description: string;
  link: string;
  ctaText: string;
  bgClasses: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Scorer {
  id: string;
  name: string;
  description: string;
  code: string;
  updatedAt: number;
}

/* istanbul ignore file */

export interface Post {
  id: string;
  title: string;
  description?: string;
  excerpt?: string;
  publishedDate: string;
  modifiedDate: string;
  tags?: string[];
  plugins?: string[];
  contentHtml?: string;
  content: string;
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

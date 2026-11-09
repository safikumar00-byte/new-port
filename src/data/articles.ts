export interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  link: string;
}

/**
 * No authored article titles/URLs were present in Sunil's supplied master profile.
 * Keep this empty until the user provides real writing links. Do not retain the
 * reference designer's articles under Sunil's name.
 */
export const articles: Article[] = [];

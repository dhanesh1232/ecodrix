declare global {
   interface BlogPost {
    id: string;
    _id: string;
    title: string | null;
    slug: string | null;
    body: string | null;
    category: string | null;
    featuredImage: { url?: string | null; altText?: string | null } | null;
    author: {
      id?: string | null;
      name?: string | null;
      avatar?: string | null;
    } | null;
    isPublished: boolean;
    publishDate: string | null;
    featured: boolean;
    metaTitle: string | null;
    metaDescription: string | null;
    canonicalUrl: string | null;
    metaKeywords: string[];
    status: string;
    tags: string[];
    readTime: number | null;
    wordCount: number | null;
    views: number;
    likes: number;
    createdAt: string | null;
    updatedAt: string | null;
  }
  
  interface BlogListResponse {
    success: boolean;
    data: BlogPost[];
    count: number;
  }
}

export {}
export interface ApiProjectDto {
  id: number;
  title: string;
  description: string;
  tags: string[];
  highlight: boolean;
  imageUrl: string;
  url: string | null;
  githubUrl: string | null;
  shortDescription?: string | null;
  longDescription?: string | null;
  type?: string | null;
  demoUrl?: string | null;
  repoUrl?: string | null;
  isFeatured?: boolean;
  isPublic?: boolean;
  heroImageUrl?: string | null;
  images?: string[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiProjectDto {
  id: number;
  title: string;
  description: string;
  tags: string[];
  highlight: boolean;
  imageUrl: string;
  url: string | null;
  githubUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

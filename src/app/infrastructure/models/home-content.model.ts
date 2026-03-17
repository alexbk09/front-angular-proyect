// Skill para administración (CRUD)
export interface Skill {
  id?: string;
  name: string;
  category: string;
  isFeatured: boolean;
  order: number;
}
import { ApiProjectDto } from './api-project.model';

export interface HomeLink {
  type: 'github' | 'linkedin' | 'cv' | 'portfolio' | string;
  label: string;
  url: string;
  icon?: string | null;
}

export interface HomeMetric {
  id: string;
  label: string;
  value: string;
  suffix?: string | null;
}

export interface HomeSkill {
  id: string;
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert' | string;
  category?: string | null;
}

export interface HomeTestimonial {
  id: string;
  name: string;
  role?: string | null;
  company?: string | null;
  quote: string;
  avatarUrl?: string | null;
  isActive: boolean;
}

export interface HomeHero {
  title: string;
  subtitle: string;
  role: string;
  description: string;
  avatarUrl?: string | null;
  location?: string | null;
}

export interface HomeAbout {
  title: string;
  body: string;
}

export interface HomeContent {
  hero: HomeHero;
  about: HomeAbout;
  metrics: HomeMetric[];
  featuredProjects: ApiProjectDto[];
  testimonials: HomeTestimonial[];
  skills: HomeSkill[];
  links: HomeLink[];
  sectionsEnabled?: Record<string, boolean>;
}

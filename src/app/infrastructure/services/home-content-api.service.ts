import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HomeContent, HomeMetric, HomeSkill, HomeTestimonial, HomeLink, HomeHero, HomeAbout } from '../models/home-content.model';
import { ApiProjectDto } from '../models/api-project.model';

// TODO: mover API_BASE_URL a environments, alineado con otros servicios.
const API_BASE_URL = 'http://localhost:8000/api';

@Injectable({ providedIn: 'root' })
export class HomeContentApiService {
  private readonly http = inject(HttpClient);

  getHomeContent(): Observable<HomeContent> {
    return this.http
      .get<ApiHomeResponseDto>(`${API_BASE_URL}/home`)
      .pipe(map((response) => this.toHomeContent(response.data)));
  }

  // Modo mock para desarrollo local mientras el backend no está listo.
  getMockHomeContent(): Observable<HomeContent> {
    const mock: HomeContent = {
      hero: {
        title: 'Construyo frontends limpios y escalables',
        subtitle: 'Angular · Tailwind · Laravel API',
        role: 'Frontend / Fullstack Developer',
        description:
          'Soy desarrollador orientado a producto que diseña y construye interfaces claras, conectadas a APIs Laravel, con foco en UX, testing y mantenibilidad.',
        avatarUrl: null,
        location: 'Remoto · Latam / Global'
      },
      about: {
        title: 'Sobre mí',
        body:
          'Trabajo principalmente con Angular y Laravel construyendo dashboards, sistemas internos y portales para usuarios finales. Me preocupa que el código sea fácil de mantener, que las pantallas sean claras para personas no técnicas y que el rendimiento no se degrade a medida que la app crece.'
      },
      metrics: [
        { id: 'experience', label: 'Años de experiencia', value: '3+', suffix: null },
        { id: 'projects', label: 'Proyectos completados', value: '15+', suffix: null },
        { id: 'stack', label: 'Tecnologías clave', value: '8+', suffix: null }
      ],
      featuredProjects: [],
      testimonials: [
        {
          id: 't1',
          name: 'Product Owner',
          role: 'SaaS B2B',
          company: null,
          quote:
            'Entregó un panel de administración claro y estable, que el equipo de soporte pudo usar sin entrenamiento extra.',
          avatarUrl: null,
          isActive: true
        },
        {
          id: 't2',
          name: 'CTO',
          role: 'Startup',
          company: null,
          quote:
            'Se encargó del frontend en Angular y de la integración con nuestra API en Laravel, proponiendo mejoras de arquitectura y testing.',
          avatarUrl: null,
          isActive: true
        }
      ],
      skills: [
        { id: 'angular', name: 'Angular', level: 'expert', category: 'Frontend' },
        { id: 'laravel', name: 'Laravel', level: 'advanced', category: 'Backend' },
        { id: 'tailwind', name: 'Tailwind CSS', level: 'advanced', category: 'UI' },
        { id: 'ngrx', name: 'NgRx / Signals', level: 'advanced', category: 'Estado' }
      ],
      links: [
        { type: 'github', label: 'GitHub', url: 'https://github.com/tu-usuario', icon: null },
        { type: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/tu-usuario', icon: null },
        { type: 'cv', label: 'Descargar CV', url: '#cv', icon: null }
      ]
    };

    return of(mock).pipe(delay(400));
  }

  private toHomeContent(data: ApiHomeDataDto): HomeContent {
    const hero: HomeHero = {
      title: data.hero.title,
      subtitle: data.hero.subtitle,
      role: data.hero.role,
      description: data.hero.description,
      avatarUrl: data.hero.avatarUrl ?? null,
      location: data.hero.location ?? null
    };

    const about: HomeAbout = {
      title: data.about.title,
      body: data.about.body
    };

    const metrics: HomeMetric[] = (data.metrics ?? []).map((m, index) => ({
      id: m.label ? m.label.toLowerCase().replace(/\s+/g, '-') : `metric-${index}`,
      label: m.label,
      value: m.value,
      suffix: null
    }));

    const skills: HomeSkill[] = (data.skills ?? []).map((s) => ({
      id: String(s.id),
      name: s.name,
      level: undefined,
      category: s.category ?? null
    }));

    const testimonials: HomeTestimonial[] = (data.testimonials ?? []).map((t) => ({
      id: String(t.id),
      name: t.name,
      role: t.position ?? null,
      company: t.company ?? null,
      quote: t.testimonial,
      avatarUrl: t.imageUrl ?? null,
      isActive: true
    }));

    const links: HomeLink[] = (data.links ?? []).map((l) => ({
      type: (l.label || '').toLowerCase(),
      label: l.label,
      url: l.url,
      icon: null
    }));

    const featuredProjects: ApiProjectDto[] = (data.featuredProjects ?? []) as ApiProjectDto[];

    return {
      hero,
      about,
      metrics,
      featuredProjects,
      testimonials,
      skills,
      links,
      sectionsEnabled: data.sections_enabled ?? undefined
    };
  }
}

interface ApiHomeHeroDto {
  title: string;
  subtitle: string;
  role: string;
  description: string;
  avatarUrl?: string | null;
  location?: string | null;
}

interface ApiHomeAboutDto {
  title: string;
  body: string;
}

interface ApiHomeMetricDto {
  label: string;
  value: string;
}

interface ApiHomeSkillDto {
  id: string | number;
  name: string;
  category?: string | null;
  percentage?: number;
  icon?: string | null;
  color?: string | null;
  order?: number;
}

interface ApiHomeTestimonialDto {
  id: string | number;
  name: string;
  position?: string | null;
  company?: string | null;
  testimonial: string;
  rating?: number;
  imageUrl?: string | null;
  createdAt?: string;
}

interface ApiHomeLinkDto {
  label: string;
  url: string;
}

interface ApiHomeDataDto {
  hero: ApiHomeHeroDto;
  about: ApiHomeAboutDto;
  metrics: ApiHomeMetricDto[];
  featuredProjects?: ApiProjectDto[];
  testimonials: ApiHomeTestimonialDto[];
  skills: ApiHomeSkillDto[];
  links: ApiHomeLinkDto[];
  sections_enabled?: Record<string, boolean>;
}

interface ApiHomeResponseDto {
  data: ApiHomeDataDto;
}

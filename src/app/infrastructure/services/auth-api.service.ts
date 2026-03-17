import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponseDto, LoginPayload, LogoutResponseDto, MeResponseDto, RegisterPayload } from '../models/api-auth.model';
import { ApiProjectDto } from '../models/api-project.model';
import { UserProfileDto } from '../models/api-user-profile.model';

// TODO: mover API_BASE_URL a environments.
const API_BASE_URL = 'http://localhost:8000/api';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly http = inject(HttpClient);

  login(payload: LoginPayload): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${API_BASE_URL}/auth/login`, payload);
  }

  register(payload: RegisterPayload): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${API_BASE_URL}/auth/register`, payload);
  }

  logout(): Observable<LogoutResponseDto> {
    return this.http.post<LogoutResponseDto>(`${API_BASE_URL}/auth/logout`, {});
  }

  me(): Observable<MeResponseDto> {
    return this.http.get<MeResponseDto>(`${API_BASE_URL}/auth/me`);
  }
}

export interface ListProjectsParams {
  highlight?: boolean;
  search?: string;
  page?: number;
  perPage?: number;
}

export interface ListProjectsResponse {
  data: ApiProjectDto[];
  // TODO: tipar correctamente meta según backend Laravel.
  meta: unknown;
}

export interface GetProjectByIdResponse {
  data: ApiProjectDto;
}

@Injectable({ providedIn: 'root' })
export class ProjectsApiService {
  private readonly http = inject(HttpClient);

  listProjects(params?: ListProjectsParams): Observable<ListProjectsResponse> {
    let httpParams = new HttpParams();

    if (params) {
      if (params.highlight !== undefined) {
        httpParams = httpParams.set('highlight', String(params.highlight));
      }
      if (params.search) {
        httpParams = httpParams.set('search', params.search);
      }
      if (params.page !== undefined) {
        httpParams = httpParams.set('page', String(params.page));
      }
      if (params.perPage !== undefined) {
        httpParams = httpParams.set('perPage', String(params.perPage));
      }
    }

    return this.http.get<ListProjectsResponse>(`${API_BASE_URL}/projects`, {
      params: httpParams
    });
  }

  getProjectById(id: number | string): Observable<GetProjectByIdResponse> {
    return this.http.get<GetProjectByIdResponse>(`${API_BASE_URL}/projects/${id}`);
  }
}

export interface GetProfileResponse {
  data: UserProfileDto;
}

// Payload simplificado para actualización de perfil, alineado con los campos más usados
// TODO: si se amplía el perfil en el backend, extender explícitamente este tipo.
export interface UpdateProfilePreferencesPayload {
  theme?: 'light' | 'dark' | 'system';
  language?: string | null;
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  bio?: string | null;
  avatarUrl?: string | null;
  location?: string | null;
  websiteUrl?: string | null;
  preferences?: UpdateProfilePreferencesPayload;
}

export interface UpdateProfileResponse {
  data: UserProfileDto;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ProfileApiService {
  private readonly http = inject(HttpClient);

  getProfile(): Observable<GetProfileResponse> {
    return this.http.get<GetProfileResponse>(`${API_BASE_URL}/profile`);
  }

  updateProfile(payload: UpdateProfilePayload): Observable<UpdateProfileResponse> {
    return this.http.put<UpdateProfileResponse>(`${API_BASE_URL}/profile`, payload);
  }
}

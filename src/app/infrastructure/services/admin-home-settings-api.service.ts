import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeHero, HomeLink } from '../models/home-content.model';

const API_BASE_URL = 'http://localhost:8000/api';

export interface UpdateHeroDto {
  hero: HomeHero;
  links: HomeLink[];
}

@Injectable({ providedIn: 'root' })
export class AdminHomeSettingsApiService {
  private readonly http = inject(HttpClient);

  updateHeroSettings(data: UpdateHeroDto): Observable<void> {
    return this.http.put<void>(`${API_BASE_URL}/admin/home-settings`, data);
  }
}

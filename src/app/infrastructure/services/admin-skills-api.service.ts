import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../models/home-content.model';

const API_BASE_URL = 'http://localhost:8000/api';

export interface UpdateSkillsDto {
  skills: Skill[];
}

@Injectable({ providedIn: 'root' })
export class AdminSkillsApiService {
  private readonly http = inject(HttpClient);

  updateSkills(data: UpdateSkillsDto): Observable<void> {
    return this.http.put<void>(`${API_BASE_URL}/admin/skills`, data);
  }
}

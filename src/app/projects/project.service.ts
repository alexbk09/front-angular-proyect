import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from './proyecto.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private apiUrl = '/api/proyectos';

  constructor(private http: HttpClient) {}

  getProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.apiUrl);
  }

  createProyecto(data: FormData): Observable<Proyecto> {
    return this.http.post<Proyecto>(this.apiUrl, data);
  }

  updateProyecto(id: number, data: FormData): Observable<Proyecto> {
    return this.http.post<Proyecto>(`${this.apiUrl}/${id}?_method=PUT`, data);
  }

  deleteProyecto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

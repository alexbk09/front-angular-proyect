import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Metric } from './metrics.model';

@Injectable({ providedIn: 'root' })
export class MetricsService {
  private apiUrl = '/api/metrics'; // Ajusta la URL base según tu proxy/backend

  constructor(private http: HttpClient) {}

  getAll(): Observable<Metric[]> {
    return this.http.get<{ data: Metric[] }>(this.apiUrl).pipe(
      map((res: { data: Metric[] }) => res.data)
    );
  }

  getById(id: number): Observable<Metric> {
    return this.http.get<{ data: Metric }>(`${this.apiUrl}/${id}`).pipe(
      map((res: { data: Metric }) => res.data)
    );
  }

  create(metric: Partial<Metric>): Observable<Metric> {
    return this.http.post<{ data: Metric }>(this.apiUrl, metric).pipe(
      map((res: { data: Metric }) => res.data)
    );
  }

  update(id: number, metric: Partial<Metric>): Observable<Metric> {
    return this.http.put<{ data: Metric }>(`${this.apiUrl}/${id}`, metric).pipe(
      map((res: { data: Metric }) => res.data)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

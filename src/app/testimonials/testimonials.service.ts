import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Testimonio } from './testimonial.model';

@Injectable({ providedIn: 'root' })
export class TestimonialsService {
  private apiUrl = '/api/testimonios';

  constructor(private http: HttpClient) {}

  getTestimonios(): Observable<Testimonio[]> {
    return this.http.get<Testimonio[]>(this.apiUrl);
  }

  createTestimonio(data: FormData): Observable<Testimonio> {
    return this.http.post<Testimonio>(this.apiUrl, data);
  }

  updateTestimonio(id: number, data: FormData): Observable<Testimonio> {
    return this.http.post<Testimonio>(`${this.apiUrl}/${id}?_method=PUT`, data);
  }

  deleteTestimonio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

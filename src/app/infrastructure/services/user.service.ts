import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { mapUserDtoToModel, UserDTO } from '../maps/user.map';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/users';

  getAll(): Observable<User[]> {
    return this.http
      .get<UserDTO[]>(this.baseUrl)
      .pipe(map((arr) => arr.map(mapUserDtoToModel)));
  }
}

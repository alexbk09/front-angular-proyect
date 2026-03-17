import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { AuthResponseDto, LogoutResponseDto, MeResponseDto, RegisterPayload, LoginPayload } from '../models/api-auth.model';

class HttpClientMock {
  post = vi.fn();
  get = vi.fn();
}

describe('AuthApiService', () => {
  let service: AuthApiService;
  let http: HttpClientMock;

  beforeEach(() => {
    http = new HttpClientMock();

    TestBed.configureTestingModule({
      providers: [
        AuthApiService,
        { provide: HttpClient, useValue: http }
      ]
    });

    service = TestBed.inject(AuthApiService);

    http.post.mockReturnValue(of({} as AuthResponseDto));
    http.get.mockReturnValue(of({} as MeResponseDto));
  });

  it('login debe llamar a POST /auth/login con el payload correcto', () => {
    const payload: LoginPayload = { email: 'user@example.com', password: 'secret' };

    service.login(payload).subscribe();

    expect(http.post).toHaveBeenCalledWith('http://localhost:8000/api/auth/login', payload);
  });

  it('register debe llamar a POST /auth/register', () => {
    const payload: RegisterPayload = {
      name: 'User',
      email: 'user@example.com',
      password: 'secret',
      password_confirmation: 'secret',
      role: 'freelancer'
    };

    service.register(payload).subscribe();

    expect(http.post).toHaveBeenCalledWith('http://localhost:8000/api/auth/register', payload);
  });

  it('logout debe llamar a POST /auth/logout', () => {
    http.post.mockReturnValue(of({} as LogoutResponseDto));

    service.logout().subscribe();

    expect(http.post).toHaveBeenCalledWith('http://localhost:8000/api/auth/logout', {});
  });

  it('me debe llamar a GET /auth/me', () => {
    service.me().subscribe();

    expect(http.get).toHaveBeenCalledWith('http://localhost:8000/api/auth/me');
  });
});

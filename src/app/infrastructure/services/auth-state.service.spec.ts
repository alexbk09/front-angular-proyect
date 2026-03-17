import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { AuthStateService } from './auth-state.service';
import { AuthResponseDto, AuthUserDto } from '../models/api-auth.model';

describe('AuthStateService', () => {
  const user: AuthUserDto = {
    id: 1,
    name: 'User',
    email: 'user@example.com',
    role: 'freelancer',
    createdAt: '2024-01-01T00:00:00Z'
  };

  const authResponse: AuthResponseDto = {
    user,
    token: 'token-123',
    message: 'ok'
  };

  it('no debe leer localStorage en entorno no navegador', () => {
    const getItemSpy = vi.spyOn(globalThis as any, 'localStorage', 'get');

    TestBed.configureTestingModule({
      providers: [
        AuthStateService,
        { provide: PLATFORM_ID, useValue: 'server' }
      ]
    });

    const service = TestBed.inject(AuthStateService);

    expect(service.isAuthenticated()).toBe(false);
    expect(service.user()).toBeNull();
    expect(getItemSpy).not.toHaveBeenCalled();
  });

  it('setSession y clearSession deben actualizar signals en navegador', () => {
    const setItemSpy = vi.spyOn(window.localStorage, 'setItem');
    const removeItemSpy = vi.spyOn(window.localStorage, 'removeItem');

    TestBed.configureTestingModule({
      providers: [
        AuthStateService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });

    const service = TestBed.inject(AuthStateService);

    service.setSession(authResponse);

    expect(service.isAuthenticated()).toBe(true);
    expect(service.user()).toEqual(user);
    expect(setItemSpy).toHaveBeenCalledTimes(2);

    service.clearSession();

    expect(service.isAuthenticated()).toBe(false);
    expect(service.user()).toBeNull();
    expect(removeItemSpy).toHaveBeenCalledTimes(2);
  });

  it('initFromStorage debe hidratar estado desde localStorage en navegador', () => {
    window.localStorage.setItem('auth_token', 'abc');
    window.localStorage.setItem('auth_user', JSON.stringify(user));

    TestBed.configureTestingModule({
      providers: [
        AuthStateService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });

    const service = TestBed.inject(AuthStateService);

    expect(service.isAuthenticated()).toBe(true);
    expect(service.user()).toEqual(user);
  });
});

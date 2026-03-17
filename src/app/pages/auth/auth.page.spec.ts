import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AuthPage } from './auth.page';
import { AuthApiService } from '../../infrastructure/services/auth-api.service';
import { AuthStateService } from '../../infrastructure/services/auth-state.service';

class AuthApiServiceMock {
	login = vi.fn();
	register = vi.fn();
}

class AuthStateServiceMock {
	setSession = vi.fn();
}

describe('AuthPage', () => {
	let component: AuthPage;
	let authApi: AuthApiServiceMock;
	let authState: AuthStateServiceMock;

	beforeEach(() => {
		authApi = new AuthApiServiceMock();
		authState = new AuthStateServiceMock();

		TestBed.configureTestingModule({
			imports: [AuthPage, RouterTestingModule],
			providers: [
				{ provide: AuthApiService, useValue: authApi },
				{ provide: AuthStateService, useValue: authState }
			]
		}).compileComponents();

		const fixture = TestBed.createComponent(AuthPage);
		component = fixture.componentInstance;
	});

	it('no debe llamar a login si el formulario es inválido', () => {
		component.loginForm.setValue({ email: '', password: '' });

		component.onLoginSubmit();

		expect(authApi.login).not.toHaveBeenCalled();
	});

	it('debe llamar a login con payload válido', () => {
		authApi.login.mockReturnValue(of({ user: null, token: 't', message: 'ok' } as any));

		component.loginForm.setValue({ email: 'user@example.com', password: '123456' });

		component.onLoginSubmit();

		expect(authApi.login).toHaveBeenCalledWith({
			email: 'user@example.com',
			password: '123456'
		});
	});
});


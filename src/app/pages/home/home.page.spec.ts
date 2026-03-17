import { TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { HomeStateService } from '../../infrastructure/services/home-state.service';

class HomeStateServiceMock {
	loadProjects = vi.fn();
	filteredProjects = vi.fn(() => []);
	filter = vi.fn(() => 'all');
	isLoading = vi.fn(() => false);
	status = vi.fn(() => 'idle');
	error = vi.fn(() => null);
}

describe('HomePage', () => {
	let component: HomePage;
	let state: HomeStateServiceMock;

	beforeEach(() => {
		state = new HomeStateServiceMock();

		TestBed.configureTestingModule({
			imports: [HomePage],
			providers: [{ provide: HomeStateService, useValue: state }]
		}).compileComponents();

		const fixture = TestBed.createComponent(HomePage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('debe cargar proyectos al inicializar', () => {
		expect(state.loadProjects).toHaveBeenCalled();
	});
});


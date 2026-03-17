import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HomeStateService } from './home-state.service';
import { ListProjectsResponse, ProjectsApiService } from './auth-api.service';

class ProjectsApiServiceMock {
  listProjects = vi.fn();
}

describe('HomeStateService', () => {
  let service: HomeStateService;
  let projectsApi: ProjectsApiServiceMock;

  beforeEach(() => {
    projectsApi = new ProjectsApiServiceMock();

    TestBed.configureTestingModule({
      providers: [
        HomeStateService,
        { provide: ProjectsApiService, useValue: projectsApi }
      ]
    });

    service = TestBed.inject(HomeStateService);
  });

  it('debe exponer el estado inicial correcto', () => {
    expect(service.status()).toBe('idle');
    expect(service.error()).toBeNull();
    expect(service.filteredProjects()).toEqual([]);
  });

  it('debe actualizar projects y status en éxito', () => {
    const apiResponse: ListProjectsResponse = {
      data: [
        { id: 1, title: 'P1', description: 'Desc', tags: ['angular'], highlight: true }
      ],
      meta: {} as unknown
    };

    projectsApi.listProjects.mockReturnValue(of(apiResponse));

    service.loadProjects();

    expect(service.status()).toBe('success');
    expect(service.error()).toBeNull();
    expect(service.filteredProjects().length).toBe(1);
    expect(service.filteredProjects()[0]).toMatchObject({
      id: '1',
      title: 'P1',
      highlight: true
    });
  });

  it('debe dejar status en error y limpiar projects en fallo', () => {
    projectsApi.listProjects.mockReturnValue(throwError(() => new Error('boom')));

    service.loadProjects();

    expect(service.status()).toBe('error');
    expect(service.error()).toBe('No se pudieron cargar los proyectos.');
    expect(service.filteredProjects()).toEqual([]);
  });
});

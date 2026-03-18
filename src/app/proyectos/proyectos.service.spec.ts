import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProyectosService } from './proyectos.service';
import { Proyecto } from './proyecto.model';

describe('ProyectosService', () => {
  let service: ProyectosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProyectosService]
    });
    service = TestBed.inject(ProyectosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe obtener la lista de proyectos', () => {
    const mockProyectos: Proyecto[] = [
      { id: '1', nombre: 'Test', descripcion: 'Desc', tecnologias: ['Angular'], enlace: 'http://test', imagen: 'img.png' }
    ];
    service.getProyectos().subscribe(proyectos => {
      expect(proyectos.length).toBe(1);
      expect(proyectos[0].nombre).toBe('Test');
    });
    const req = httpMock.expectOne('/api/proyectos');
    expect(req.request.method).toBe('GET');
    req.flush(mockProyectos);
  });
});

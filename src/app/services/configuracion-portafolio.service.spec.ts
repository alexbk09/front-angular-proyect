import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfiguracionPortafolioService, ConfiguracionPortafolio } from './configuracion-portafolio.service';

describe('ConfiguracionPortafolioService', () => {
  let service: ConfiguracionPortafolioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfiguracionPortafolioService]
    });
    service = TestBed.inject(ConfiguracionPortafolioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe obtener la configuración del portafolio', (done) => {
    const mockConfig: ConfiguracionPortafolio = {
      sobreMi: { nombre: 'Test', descripcion: 'Desc', fotoUrl: 'img.png', contacto: '123' },
      skills: ['Angular'],
      contacto: { email: 'a@a.com', redesSociales: ['http://x.com'] }
    };
    service.configSignal().subscribe((state) => {
      if (!state.loading) {
        expect(state.data).toEqual(mockConfig);
        done();
      }
    });
    const req = httpMock.expectOne('/api/configuracion-portafolio');
    expect(req.request.method).toBe('GET');
    req.flush(mockConfig);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioContactoComponent } from './formulario-contacto.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FormularioContactoComponent', () => {
  let component: FormularioContactoComponent;
  let fixture: ComponentFixture<FormularioContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioContactoComponent, HttpClientTestingModule, FormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(FormularioContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el título del formulario', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent).toContain('Formulario de Contacto');
  });
});

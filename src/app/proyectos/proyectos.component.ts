import { Component, signal, OnInit } from '@angular/core';
import { ProyectosService } from './proyectos.service';
import { Proyecto } from './proyecto.model';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectos = signal<Proyecto[] | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private proyectosService: ProyectosService) {}

  ngOnInit(): void {
    this.loading.set(true);
    this.proyectosService.getProyectos().subscribe({
      next: (data) => {
        this.proyectos.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar los proyectos');
        this.loading.set(false);
      }
    });
  }
}

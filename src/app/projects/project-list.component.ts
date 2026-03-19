import { Component, Signal, signal, OnInit } from '@angular/core';
import { Proyecto } from './proyecto.model';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  proyectos: Signal<Proyecto[]> = signal([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.fetchProyectos();
  }

  fetchProyectos() {
    this.loading.set(true);
    this.projectService.getProyectos().subscribe({
      next: (proyectos) => {
        this.proyectos.set(proyectos);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar proyectos');
        this.loading.set(false);
      }
    });
  }

  // Métodos para editar/eliminar se agregarán después
}

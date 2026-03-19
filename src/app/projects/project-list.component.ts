import { Component, signal, WritableSignal, OnInit } from '@angular/core';
import { Proyecto } from './proyecto.model';
import { ProjectService } from './project.service';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from './toast.component';
import { ProjectDeleteModalComponent } from './project-delete-modal.component';
@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastComponent, ProjectDeleteModalComponent],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  proyectos: WritableSignal<Proyecto[]> = signal([]);
  loading = signal(true);
  error = signal<string | null>(null);
  proyectoAEliminar: Proyecto | null = null;

  constructor(private projectService: ProjectService, private router: Router, private toast: ToastService) {}

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

  irANuevo() {
    this.router.navigate(['admin/proyectos/nuevo']);
  }

  irAEditar(proyecto: Proyecto) {
    this.router.navigate(['admin/proyectos/editar', proyecto.id]);
  }

  confirmarEliminar(proyecto: Proyecto) {
    this.proyectoAEliminar = proyecto;
  }

  cancelarEliminar() {
    this.proyectoAEliminar = null;
  }

  eliminarProyecto() {
    if (!this.proyectoAEliminar) return;
    this.loading.set(true);
    this.projectService.deleteProyecto(this.proyectoAEliminar.id).subscribe({
      next: () => {
        this.fetchProyectos();
        this.toast.show('Proyecto eliminado correctamente', 'success');
        this.proyectoAEliminar = null;
      },
      error: () => {
        this.error.set('Error al eliminar proyecto');
        this.toast.show('Error al eliminar proyecto', 'error');
        this.loading.set(false);
      }
    });
  }
}

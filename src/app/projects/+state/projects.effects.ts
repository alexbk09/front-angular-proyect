import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectService } from '../project.service';
import * as ProjectsActions from './projects.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ProjectsEffects {
  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.loadProjects),
      mergeMap(() =>
        this.projectService.getProyectos().pipe(
          map(proyectos => ProjectsActions.loadProjectsSuccess({ proyectos })),
          catchError(error => of(ProjectsActions.loadProjectsFailure({ error: error.message || 'Error cargando proyectos' })))
        )
      )
    )
  );

  addProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.addProject),
      mergeMap(({ data }) =>
        this.projectService.createProyecto(data).pipe(
          map(proyecto => ProjectsActions.addProjectSuccess({ proyecto })),
          catchError(error => of(ProjectsActions.addProjectFailure({ error: error.message || 'Error creando proyecto' })))
        )
      )
    )
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.updateProject),
      mergeMap(({ id, data }) =>
        this.projectService.updateProyecto(id, data).pipe(
          map(proyecto => ProjectsActions.updateProjectSuccess({ proyecto })),
          catchError(error => of(ProjectsActions.updateProjectFailure({ error: error.message || 'Error actualizando proyecto' })))
        )
      )
    )
  );

  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.deleteProject),
      mergeMap(({ id }) =>
        this.projectService.deleteProyecto(id).pipe(
          map(() => ProjectsActions.deleteProjectSuccess({ id })),
          catchError(error => of(ProjectsActions.deleteProjectFailure({ error: error.message || 'Error eliminando proyecto' })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private router: Router
  ) {}
}

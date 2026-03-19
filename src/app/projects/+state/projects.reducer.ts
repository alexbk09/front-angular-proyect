import { createReducer, on } from '@ngrx/store';
import * as ProjectsActions from './projects.actions';
import { Proyecto } from '../proyecto.model';

export interface ProjectsState {
  proyectos: Proyecto[];
  loading: boolean;
  error: string | null;
}

export const initialState: ProjectsState = {
  proyectos: [],
  loading: false,
  error: null
};

export const projectsReducer = createReducer(
  initialState,
  on(ProjectsActions.loadProjects, (state) => ({ ...state, loading: true, error: null })),
  on(ProjectsActions.loadProjectsSuccess, (state, { proyectos }) => ({ ...state, proyectos, loading: false })),
  on(ProjectsActions.loadProjectsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(ProjectsActions.addProjectSuccess, (state, { proyecto }) => ({ ...state, proyectos: [proyecto, ...state.proyectos] })),
  on(ProjectsActions.updateProjectSuccess, (state, { proyecto }) => ({
    ...state,
    proyectos: state.proyectos.map(p => p.id === proyecto.id ? proyecto : p)
  })),
  on(ProjectsActions.deleteProjectSuccess, (state, { id }) => ({
    ...state,
    proyectos: state.proyectos.filter(p => p.id !== id)
  })),

  on(ProjectsActions.addProjectFailure, ProjectsActions.updateProjectFailure, ProjectsActions.deleteProjectFailure, (state, { error }) => ({ ...state, error }))
);

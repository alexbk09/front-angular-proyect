import { createAction, props } from '@ngrx/store';
import { Proyecto } from '../proyecto.model';

export const loadProjects = createAction('[Projects] Load Projects');
export const loadProjectsSuccess = createAction('[Projects] Load Projects Success', props<{ proyectos: Proyecto[] }>());
export const loadProjectsFailure = createAction('[Projects] Load Projects Failure', props<{ error: string }>());

export const addProject = createAction('[Projects] Add Project', props<{ data: FormData }>());
export const addProjectSuccess = createAction('[Projects] Add Project Success', props<{ proyecto: Proyecto }>());
export const addProjectFailure = createAction('[Projects] Add Project Failure', props<{ error: string }>());

export const updateProject = createAction('[Projects] Update Project', props<{ id: number, data: FormData }>());
export const updateProjectSuccess = createAction('[Projects] Update Project Success', props<{ proyecto: Proyecto }>());
export const updateProjectFailure = createAction('[Projects] Update Project Failure', props<{ error: string }>());

export const deleteProject = createAction('[Projects] Delete Project', props<{ id: number }>());
export const deleteProjectSuccess = createAction('[Projects] Delete Project Success', props<{ id: number }>());
export const deleteProjectFailure = createAction('[Projects] Delete Project Failure', props<{ error: string }>());

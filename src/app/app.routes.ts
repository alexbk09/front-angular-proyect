import { Routes } from '@angular/router';
import { InicioPage } from './pages/inicio/inicio.page';

export const routes: Routes = [
	{ path: '', redirectTo: 'inicio', pathMatch: 'full' },
	{ path: 'inicio', component: InicioPage },
];

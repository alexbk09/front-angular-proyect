import { Routes } from '@angular/router';
import { MetricsAdminComponent } from './metrics-admin.component';

export const metricsRoutes: Routes = [
  {
    path: 'admin/metrics',
    component: MetricsAdminComponent,
    // canActivate: [AdminGuard] // Descomenta si tienes guard de admin
  }
];

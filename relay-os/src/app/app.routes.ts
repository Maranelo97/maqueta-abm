import { Routes } from '@angular/router';
import { ShellComponent } from './core/layout/shell.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./pages/analytics/analytics.component').then((m) => m.AnalyticsComponent),
      },
      {
        path: 'active-management',
        loadComponent: () =>
          import('./pages/active-management/active-management.component').then(
            (m) => m.ActiveManagementComponent,
          ),
      },
      {
        path: 'visualizations',
        loadComponent: () =>
          import('./pages/Visualizations/Visualizations').then((m) => m.Visualizations),
      },
      {
        path: 'audit-logs',
        loadComponent: () =>
          import('./pages/audit-logs/audit-logs.component').then((m) => m.AuditLogsComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.component').then((m) => m.SettingsComponent),
      },
      {
        path: 'deploy',
        loadComponent: () =>
          import('./pages/deploy/deploy.component').then((m) => m.DeployComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

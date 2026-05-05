import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../services/theme.service';

interface NavItem { label: string; route: string; icon: string; }

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shell.component.html',
})
export class ShellComponent {
  themeService = inject(ThemeService);

  navItems: NavItem[] = [
    { label: 'Relay Clusters',  route: '/dashboard',          icon: 'clusters'  },
    { label: 'Analytics',       route: '/analytics',          icon: 'analytics' },
    { label: 'Management',   route: '/active-management',  icon: 'config'    },
  ];
}

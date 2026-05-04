import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem { label: string; route: string; icon: string; }

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shell.component.html',
})
export class ShellComponent {
  navItems: NavItem[] = [
    { label: 'Relay Clusters',  route: '/dashboard',          icon: 'clusters'  },
    { label: 'Analytics',       route: '/analytics',          icon: 'analytics' },
    { label: 'Audit Logs',      route: '/audit-logs',         icon: 'logs'      },
    { label: 'Configuration',   route: '/active-management',  icon: 'config'    },
    { label: 'Settings',        route: '/settings',           icon: 'settings'  },
  ];
}

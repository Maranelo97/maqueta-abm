import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../services/theme.service';

interface NavItem {
  label: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shell.component.html',
})
export class ShellComponent {
  themeService = inject(ThemeService);
  router = inject(Router);
  isMobileMenuOpen = false;

  navItems: NavItem[] = [
    { label: 'Relays', route: '/dashboard', icon: 'clusters' },
    { label: 'Visualizaciones', route: '/visualizations', icon: 'analytics' },
  ];

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    this.router.navigate(['/login']);
  }
}

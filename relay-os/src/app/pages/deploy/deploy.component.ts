import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-deploy',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './deploy.component.html',
})
export class DeployComponent {
  form = { name: '', endpointUrl: '', protocol: 'TCP', tier: 'Primary', description: '' };
  constructor(private router: Router) {}
  deploy() { this.router.navigate(['/dashboard']); }
  cancel() { this.router.navigate(['/dashboard']); }
}

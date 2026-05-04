import { Component, inject } from '@angular/core';
import { RelayService } from '../../core/services/relay.service';

@Component({
  selector: 'app-audit-logs',
  standalone: true,
  imports: [],
  templateUrl: './audit-logs.component.html',
})
export class AuditLogsComponent {
  svc = inject(RelayService);
  logs = this.svc.activityLogs;

  statusClass(s: string) {
    return s === 'SUCCESS' ? 'badge-success' : s === 'INVESTIGATING' ? 'badge-investigating' : 'badge-completed';
  }
}

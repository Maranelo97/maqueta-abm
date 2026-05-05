import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RelayService, RelayNode } from '../../core/services/relay.service';

@Component({
  selector: 'app-visualizations',
  imports: [],
  templateUrl: './Visualizations.html',
  styleUrl: './Visualizations.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Visualizations {
  svc = inject(RelayService);

  get onlineCount() {
    return this.tableRelays.filter((r) => r.status !== 'down').length;
  }
  get tableRelays(): RelayNode[] {
    return this.svc.relays.slice(0, 9);
  }

  statusClass(status: string) {
    return status === 'active' ? 'badge-active' : status === 'idle' ? 'badge-idle' : 'badge-down';
  }
  statusLabel(status: string) {
    return status === 'active' ? '● Active' : status === 'idle' ? '● Idle' : '● Down';
  }
}

import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { RelayService, RelayNode } from '../../core/services/relay.service';

@Component({
  selector: 'app-active-management',
  standalone: true,
  imports: [FormsModule, BaseChartDirective],
  templateUrl: './active-management.component.html',
})
export class ActiveManagementComponent {
  svc = inject(RelayService);

  form = { name: '', endpointUrl: '', protocol: 'TCP', tier: 'Primary', description: '' };

  miniBarData: ChartData<'bar'> = {
    labels: ['', '', '', '', '', '', '', ''],
    datasets: [{
      data: [0.8, 1.1, 1.3, 0.9, 1.6, 1.4, 1.8, 1.2],
      backgroundColor: ['#d1d5db','#d1d5db','#111827','#d1d5db','#111827','#d1d5db','#111827','#d1d5db'],
      borderWidth: 0, barPercentage: 0.75,
    }]
  };

  miniBarOptions: ChartOptions<'bar'> = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } }
  };

  get tableRelays(): RelayNode[] { return this.svc.relays.slice(0, 9); }
  get onlineCount() { return this.tableRelays.filter(r => r.status !== 'down').length; }

  statusClass(status: string) {
    return status === 'active' ? 'badge-active' : status === 'idle' ? 'badge-idle' : 'badge-down';
  }
  statusLabel(status: string) {
    return status === 'active' ? '● Active' : status === 'idle' ? '● Idle' : '● Down';
  }

  deployNode() {
    alert(`Deploying ${this.form.name || 'new relay'}...`);
    this.form = { name: '', endpointUrl: '', protocol: 'TCP', tier: 'Primary', description: '' };
  }
  clearForm() {
    this.form = { name: '', endpointUrl: '', protocol: 'TCP', tier: 'Primary', description: '' };
  }
}

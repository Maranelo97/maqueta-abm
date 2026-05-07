import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { ChartData, ChartOptions } from 'chart.js';
import { RelayService, RelayNode } from '../../core/services/relay.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ NgClass],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  svc = inject(RelayService);

  get relays(): RelayNode[] { return this.svc.relays.slice(0, 9); }
  get activeCount() { return this.relays.filter(r => r.status === 'active').length; }
  get downCount()   { return this.relays.filter(r => r.status === 'down').length; }

  barData: ChartData<'bar'> = {
    labels: this.svc.throughputHours,
    datasets: [
      {
        data: this.svc.throughputData,
        backgroundColor: this.svc.throughputData.map((v, i) =>
          i === 4 || i === 7 || i === 8 ? '#111827' : '#d1d5db'
        ),
        borderWidth: 0,
        borderRadius: 0,
        barPercentage: 0.65,
      }
    ]
  };

  barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: {
      callbacks: { label: ctx => ` ${ctx.parsed.y} PB/s` }
    }},
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9ca3af' } },
      y: { grid: { color: '#f3f4f6' }, ticks: { font: { size: 11 }, color: '#9ca3af' }, border: { display: false } }
    }
  };

  getStatusBadge(relay: RelayNode): string {
    return relay.status === 'active' ? 'badge-active' : 'badge-down';
  }
  getStatusLabel(relay: RelayNode): string {
    return relay.status === 'active' ? '● ACTIVE' : '● DOWN';
  }
}

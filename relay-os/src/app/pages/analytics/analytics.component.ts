import { Component, inject } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { RelayService } from '../../core/services/relay.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './analytics.component.html',
})
export class AnalyticsComponent {
  svc = inject(RelayService);

  // Regional bar chart (grouped)
  regionalData: ChartData<'bar'> = {
    labels: this.svc.regionalData.labels,
    datasets: [
      { label: 'Inbound',  data: this.svc.regionalData.inbound,  backgroundColor: '#111827', borderWidth: 0, borderRadius: 0, barPercentage: 0.7 },
      { label: 'Outbound', data: this.svc.regionalData.outbound, backgroundColor: '#d1d5db', borderWidth: 0, borderRadius: 0, barPercentage: 0.7 },
    ]
  };

  regionalOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top', align: 'end',
        labels: { font: { size: 11, family: 'Inter' }, color: '#6b7280', boxWidth: 10, boxHeight: 10, padding: 16 }
      },
      tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y} PB/s` } }
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#9ca3af' } },
      y: { grid: { color: '#f3f4f6' }, ticks: { font: { size: 11 }, color: '#9ca3af' }, border: { display: false } }
    }
  };

  kpis = [
    { label: 'Total Data Throughput', value: '1.42', unit: 'PB/s', delta: '+12.5%', deltaColor: 'text-green-600', badge: '', progress: 72 },
    { label: 'System Efficiency',     value: '99.98', unit: '%',   delta: 'STABLE',  deltaColor: 'text-blue-600',  badge: '', progress: 99 },
    { label: 'Global Node Connectivity', value: '100', unit: '%',  delta: '4,102 ACTIVE', deltaColor: 'text-green-600', badge: '', progress: 100 },
    { label: 'Peak Latency',          value: '14',   unit: 'ms',   delta: '+4ms',    deltaColor: 'text-red-500',   badge: '', progress: 30 },
  ];

  logs = [
    { icon: 'sync',  title: 'Relay Cluster A-14 Re-synchronization', subtitle: 'Node ID: DNF·F921 · Location: Frankfurt, DE', time: '2 minutes ago',  status: 'SUCCESS'       },
    { icon: 'warn',  title: 'Anomalous Traffic Spike Detected',       subtitle: 'Internal IP Range: 10.0.4.1/24 · Security Layer 2', time: '14 minutes ago', status: 'INVESTIGATING' },
    { icon: 'clock', title: 'Firmware Update Propagated (v4.2.1)',    subtitle: 'All Nodes · Automatic Deployment',          time: '1 hour ago',      status: 'COMPLETED'     },
  ];

  statusClass(s: string) {
    return s === 'SUCCESS' ? 'badge-success' : s === 'INVESTIGATING' ? 'badge-investigating' : 'badge-completed';
  }
}

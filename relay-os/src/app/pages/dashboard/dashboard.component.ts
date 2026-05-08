// Dashboard component with interactive relay cards
import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartData, ChartOptions } from 'chart.js';
import { RelayService, RelayNode } from '../../core/services/relay.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  svc = inject(RelayService);
  datePipe = inject(DatePipe);

  // Form state for Add/Edit
  form: { 
    id: string; 
    name: string; 
    endpointUrl: string; 
    protocol: RelayNode['protocol']; 
    tier: RelayNode['tier']; 
    description: string; 
  } = { id: '', name: '', endpointUrl: '', protocol: 'TCP', tier: 'Primary', description: '' };
  
  // UI State
  activeMenuId: string | null = null;
  isDrawerOpen = false;
  drawerMode: 'view' | 'edit' | 'add' = 'add';
  selectedRelay: RelayNode | null = null;
  showDeleteModal = false;
  relayToDelete: RelayNode | null = null;

  // Toast notification
  toast = {
    show: false,
    message: '',
    type: 'success' as 'success' | 'info' | 'danger'
  };

  get relays(): RelayNode[] { return this.svc.relays.slice(0, 9); }
  get activeCount() { return this.relays.filter(r => r.status !== 'down').length; }
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
    return relay.status === 'active' ? 'badge-active' : relay.status === 'idle' ? 'badge-idle' : 'badge-down';
  }
  getStatusLabel(relay: RelayNode): string {
    return relay.status === 'active' ? '● ACTIVE' : relay.status === 'idle' ? '● IDLE' : '● DOWN';
  }

  toggleMenu(id: string, event: Event) {
    event.stopPropagation();
    this.activeMenuId = this.activeMenuId === id ? null : id;
  }

  openDrawer(mode: 'view' | 'edit' | 'add', relay?: RelayNode) {
    this.drawerMode = mode;
    this.selectedRelay = relay || null;
    
    if (relay) {
      this.form = { 
        id: relay.id,
        name: relay.name, 
        endpointUrl: relay.endpointUrl, 
        protocol: relay.protocol, 
        tier: relay.tier, 
        description: relay.description || '' 
      };
    } else {
      this.clearForm();
    }
    
    this.isDrawerOpen = true;
    this.activeMenuId = null;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
    this.selectedRelay = null;
    this.clearForm();
  }

  confirmDelete(relay: RelayNode) {
    this.relayToDelete = relay;
    this.showDeleteModal = true;
    this.activeMenuId = null;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.relayToDelete = null;
  }

  deleteRelay() {
    if (this.relayToDelete) {
      const name = this.relayToDelete.name;
      this.svc.relays = this.svc.relays.filter(r => r.id !== this.relayToDelete?.id);
      this.triggerToast(`Relay ${name} eliminado con éxito`, 'danger');
      this.cancelDelete();
    }
  }

  saveRelay() {
    if (this.drawerMode === 'edit' && this.selectedRelay) {
      const index = this.svc.relays.findIndex(r => r.id === this.selectedRelay?.id);
      if (index !== -1) {
        this.svc.relays[index] = { ...this.svc.relays[index], ...this.form };
      }
      this.triggerToast(`Relay ${this.form.name} actualizado con éxito`, 'success');
    }
    this.closeDrawer();
  }

  private triggerToast(message: string, type: 'success' | 'info' | 'danger') {
    this.toast = { show: true, message, type };
    setTimeout(() => {
      this.toast.show = false;
    }, 3500);
  }
  
  clearForm() {
    this.form = { id: '', name: '', endpointUrl: '', protocol: 'TCP', tier: 'Primary', description: '' };
  }

  formatDate(date: string | undefined) {
    if (!date) return 'N/A';
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss');
  }
}

import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { RelayService, RelayNode } from '../../core/services/relay.service';

@Component({
  selector: 'app-active-management',
  standalone: true,
  imports: [FormsModule, BaseChartDirective, CommonModule],
  providers: [DatePipe],
  templateUrl: './active-management.component.html',
  styleUrl: './active-management.component.css',
})
export class ActiveManagementComponent {
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

  get tableRelays(): RelayNode[] { return this.svc.relays; }
  get onlineCount() { return this.tableRelays.filter(r => r.status !== 'down').length; }

  statusClass(status: string) {
    return status === 'active' ? 'badge-active' : status === 'idle' ? 'badge-idle' : 'badge-down';
  }
  statusLabel(status: string) {
    return status === 'active' ? '● Active' : status === 'idle' ? '● Idle' : '● Down';
  }

  toggleMenu(id: string, event: Event) {
    event.stopPropagation();
    this.activeMenuId = this.activeMenuId === id ? null : id;
  }

  openDrawer(mode: 'view' | 'edit' | 'add', relay?: RelayNode) {
    this.drawerMode = mode;
    this.selectedRelay = relay || null;
    
    if (relay) {
      // If editing or viewing, populate form with relay data
      this.form = { 
        id: relay.id,
        name: relay.name, 
        endpointUrl: relay.endpointUrl, 
        protocol: relay.protocol, 
        tier: relay.tier, 
        description: relay.description || '' 
      };
    } else {
      // Reset form for adding
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

  deployNode() {
    if (this.drawerMode === 'edit' && this.selectedRelay) {
      // Update existing relay
      const index = this.svc.relays.findIndex(r => r.id === this.selectedRelay?.id);
      if (index !== -1) {
        this.svc.relays[index] = { 
          ...this.svc.relays[index], 
          ...this.form 
        };
      }
      this.triggerToast(`Relay ${this.form.name} actualizado con éxito`, 'success');
    } else {
      // Add new relay
      this.triggerToast(`Desplegando ${this.form.name || 'nuevo relay'}...`, 'info');
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


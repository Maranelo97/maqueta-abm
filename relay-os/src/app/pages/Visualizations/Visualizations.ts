import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RelayService, Visualizacion, VisualizacionGCBA } from '../../core/services/relay.service';

@Component({
  selector: 'app-visualizations',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './Visualizations.html',
  styleUrl: './Visualizations.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Visualizations {
  svc = inject(RelayService);
  isDrawerOpen = false;
  drawerMode: 'add' | 'edit' | 'view' = 'add';
  selectedVisualizacion: any | null = null;
  activeTab: 'general' | 'gcba' = 'general';

  // Sorting and Filtering
  sortColumn: string = 'patente';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedFilterRelay: number = 0;
  mostrarBajas: boolean = true;

  // Toast notification
  toast = {
    show: false,
    message: '',
    type: 'success' as 'success' | 'info' | 'danger'
  };

  // Delete Confirmation Modal
  showDeleteModal = false;
  itemToDelete: VisualizacionGCBA | null = null;

  get onlineCount() {
    return this.activeTab === 'general' ? this.tableVisualizaciones.length : this.tableVisualizacionesGCBA.length;
  }

  get tableVisualizaciones(): Visualizacion[] {
    let data = [...this.svc.visualizaciones];
    if (this.selectedFilterRelay !== 0) {
      data = data.filter((v) => v.idRelay === Number(this.selectedFilterRelay));
    }
    this.sortData(data);
    return data;
  }

  get tableVisualizacionesGCBA(): VisualizacionGCBA[] {
    let data = [...this.svc.visualizacionesGCBA];

    if (!this.mostrarBajas) {
      const now = new Date();
      data = data.filter(v => {
        const until = v.fechaHoraHasta ? new Date(v.fechaHoraHasta) : null;
        return !until || until >= now;
      });
    }

    if (this.selectedFilterRelay !== 0) {
      data = data.filter((v) => v.idRelay === Number(this.selectedFilterRelay));
    }
    this.sortData(data);
    return data;
  }

  private sortData(data: any[]) {
    data.sort((a, b) => {
      const valA = this.getSortValue(a, this.sortColumn);
      const valB = this.getSortValue(b, this.sortColumn);
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  private getSortValue(vis: any, col: string): any {
    switch (col) {
      case 'patente': return vis.patente.toLowerCase();
      case 'fechaHoraDesde': return new Date(vis.fechaHoraDesde || 0).getTime();
      case 'fechaHoraHasta': return new Date(vis.fechaHoraHasta || 0).getTime();
      case 'fechaActualizacion': return new Date(vis.fechaActualizacion || 0).getTime();
      case 'fechaHoraGps': return new Date(vis.fechaHoraGps || 0).getTime();
      case 'relay': return vis.idRelayNavigation?.nombre?.toLowerCase() || '';
      case 'ambiente': return vis.idAmbienteNavigation?.nombre?.toLowerCase() || '';
      case 'status': {
        const s = this.getGCBAStatus(vis);
        // Rank for sorting: Transmitiendo > Habilitado > Sin reportes > Inactivo
        const ranks: Record<string, number> = {
          'Transmitiendo': 1,
          'Habilitado': 2,
          'Sin reportes': 3,
          'Inactivo': 4
        };
        return ranks[s.label] || 99;
      }
      default: return '';
    }
  }

  getGCBAStatus(relay: VisualizacionGCBA) {
    const now = new Date();
    const since = relay.fechaHoraDesde ? new Date(relay.fechaHoraDesde) : null;
    const until = relay.fechaHoraHasta ? new Date(relay.fechaHoraHasta) : null;
    const lastReport = relay.fechaActualizacion ? new Date(relay.fechaActualizacion) : null;

    const estaEnPeriodo = (since && now >= since) && (!until || now <= until);

    if (!estaEnPeriodo) {
      return {
        label: 'Inactivo',
        statusClass: 'bg-gray-500 text-white',
        rowStyle: 'bg-gray-50/50 dark:bg-gray-800/20',
        lastReportClass: ''
      };
    }

    if (lastReport) {
      const diffMinutos = (now.getTime() - lastReport.getTime()) / (1000 * 60);
      if (diffMinutos < 5) {
        return {
          label: 'Transmitiendo',
          statusClass: 'bg-green-600 text-white',
          rowStyle: '',
          lastReportClass: 'bg-green-600/20 text-green-700 dark:text-green-400 font-bold px-2 py-1 rounded'
        };
      } else if (diffMinutos <= 10) {
        return {
          label: 'Sin reportes',
          statusClass: 'bg-yellow-500 text-white',
          rowStyle: '',
          lastReportClass: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 font-bold px-2 py-1 rounded'
        };
      } else {
        return {
          label: 'Sin reportes',
          statusClass: 'bg-red-600 text-white',
          rowStyle: '',
          lastReportClass: 'bg-red-600/20 text-red-700 dark:text-red-400 font-bold px-2 py-1 rounded'
        };
      }
    } else {
      return {
        label: 'Habilitado',
        statusClass: 'bg-blue-500 text-white',
        rowStyle: '',
        lastReportClass: ''
      };
    }
  }

  toggleSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  get availableRelays() {
    return this.svc.availableRelays;
  }

  get availableAmbientes() {
    return this.svc.availableAmbientes;
  }

  formatDateForInput(date: string | Date | undefined | null): string {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  stopGCBA(v: VisualizacionGCBA) {
    this.svc.stopGCBA(v.idUnidad, v.idRelay, v.idAmbiente);
    this.triggerToast(`Transmisión detenida para ${v.patente}`, 'info');
  }

  resumeGCBA(v: VisualizacionGCBA) {
    this.svc.resumeGCBA(v.idUnidad, v.idRelay, v.idAmbiente);
    this.triggerToast(`Transmisión retomada para ${v.patente}`, 'success');
  }

  deleteGCBA(v: VisualizacionGCBA) {
    this.itemToDelete = v;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.itemToDelete) {
      this.svc.deleteGCBA(this.itemToDelete.idUnidad, this.itemToDelete.idRelay, this.itemToDelete.idAmbiente);
      this.triggerToast(`Registro ${this.itemToDelete.patente} eliminado con éxito`, 'danger');
      this.showDeleteModal = false;
      this.itemToDelete = null;
    }
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.itemToDelete = null;
  }

  private triggerToast(message: string, type: 'success' | 'info' | 'danger') {
    this.toast = { show: true, message, type };
    setTimeout(() => {
      this.toast.show = false;
    }, 3500);
  }

  openDrawer(mode: 'add' | 'edit' | 'view', vis: any | null = null) {
    this.drawerMode = mode;
    this.selectedVisualizacion = vis;
    this.isDrawerOpen = true;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
    setTimeout(() => {
      this.selectedVisualizacion = null;
    }, 300);
  }
}

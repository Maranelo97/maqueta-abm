import { Injectable } from '@angular/core';

export interface RelayNode {
  id: string;
  name: string;
  protocol: 'TCP' | 'UDP' | 'HTTPS' | 'WSS' | 'gRPC' | 'GraphQL';
  endpointUrl: string;
  status: 'active' | 'down' | 'idle';
  latency?: number;
  error?: string;
  tier: 'Primary' | 'Secondary' | 'Edge';
  description?: string;
  lastEmission?: string;
}

export interface ActivityLog {
  icon: 'sync' | 'warn' | 'clock';
  title: string; subtitle: string;
  time: string; status: 'SUCCESS' | 'INVESTIGATING' | 'COMPLETED';
}

export interface Ambiente {
  idAmbiente: number;
  nombre?: string;
}

export interface Relay {
  idRelay: number;
  nombre?: string;
}

export interface Visualizacion {
  idRelay: number;
  idAmbiente: number;
  idUnidad: string;
  patente: string;
  fechaHoraDesde?: string | Date;
  fechaHoraHasta?: string | Date;
  usuario?: string;
  fechaActualizacion?: string | Date;
  idAmbienteNavigation?: Ambiente;
  idRelayNavigation?: Relay;
}

export interface VisualizacionGCBA {
  idRelay: number;
  idAmbiente: number;
  idUnidad: string;
  patente: string;
  fechaHoraDesde?: string | Date;
  fechaHoraHasta?: string | Date;
  fechaHoraGps?: string | Date;
  usuario?: string;
  fechaActualizacion?: string | Date;
  idAmbienteNavigation?: Ambiente;
  idRelayNavigation?: Relay;
}

@Injectable({ providedIn: 'root' })
export class RelayService {
  relays: RelayNode[] = [
    { id: 'RN-A-001-9X', name: 'Relay North-Alpha', protocol: 'TCP', endpointUrl: 'tcp://relay.us-east.net:8080', status: 'active', latency: 12, tier: 'Primary', lastEmission: '2024-05-07T18:30:00', description: 'Primary relay for North Alpha region.' },
    { id: 'RN-B-002-4I', name: 'Relay North-Beta',  protocol: 'UDP', endpointUrl: 'udp://relay.us-east.net:9001', status: 'active', latency: 18, tier: 'Primary', lastEmission: '2024-05-07T18:25:00', description: 'Redundant node for North region.' },
    { id: 'RS-G-095-1Z', name: 'Relay South-Gamma', protocol: 'TCP', endpointUrl: 'tcp://relay.sa-south.net:443',  status: 'down',   error: 'Connection Lost: 4m ago', tier: 'Edge', lastEmission: '2024-05-07T18:00:00', description: 'Edge relay for South Gamma region.' },
    { id: 'RE-D-016-7L', name: 'Relay East-Delta',  protocol: 'TCP', endpointUrl: 'tcp://relay.eu-east.net:8080', status: 'active', latency: 9,  tier: 'Primary', lastEmission: '2024-05-07T18:35:00', description: 'Main East corridor relay.' },
    { id: 'RW-E-055-3M', name: 'Relay West-Epsilon',protocol: 'UDP', endpointUrl: 'udp://bridge.fra-1.net:9001',  status: 'active', latency: 22, tier: 'Secondary', lastEmission: '2024-05-07T18:15:00', description: 'Secondary bridge for West traffic.' },
    { id: 'RC-Z-102-8R', name: 'Relay Central-Zeta',protocol: 'TCP', endpointUrl: 'tcp://relay.eu-west.net:8080', status: 'active', latency: 5,  tier: 'Primary', lastEmission: '2024-05-07T18:38:00', description: 'Central Zeta core node.' },
    { id: 'RC-H-103-2E', name: 'Relay Central-Eta', protocol: 'UDP', endpointUrl: 'udp://relay.eu-cent.net:9001', status: 'active', latency: 7,  tier: 'Secondary', lastEmission: '2024-05-07T18:22:00', description: 'Secondary Eta node.' },
    { id: 'RN-T-204-5K', name: 'Relay North-Theta', protocol: 'TCP', endpointUrl: 'tcp://auth.ap-south.net:443',  status: 'down',   error: 'Authentication Error', tier: 'Edge', lastEmission: '2024-05-07T17:45:00', description: 'Edge Theta authentication node.' },
    { id: 'RE-I-615-1V', name: 'Relay East-Iota',   protocol: 'TCP', endpointUrl: 'tcp://relay.ap-east.net:8080', status: 'active', latency: 14, tier: 'Primary', lastEmission: '2024-05-07T18:10:00', description: 'Primary East Iota relay.' },
    { id: 'ER-04922',    name: 'Edge-Relay-North',   protocol: 'TCP', endpointUrl: 'tcp://relay.us-east.net:8080', status: 'active', latency: 11, tier: 'Edge', lastEmission: '2024-05-07T18:05:00', description: 'Edge relay North.' },
    { id: 'CB-12994',    name: 'Core-Bridge-Delta',  protocol: 'UDP', endpointUrl: 'udp://bridge.fra-1.net:9001',  status: 'active', latency: 8,  tier: 'Secondary', lastEmission: '2024-05-07T18:12:00', description: 'Core bridge Delta.' },
    { id: 'AR-99031',    name: 'Auth-Relay-S2',      protocol: 'TCP', endpointUrl: 'tcp://auth.ap-south.net:443',  status: 'down',   error: 'Connection Lost', tier: 'Edge', lastEmission: '2024-05-07T17:30:00', description: 'Auth relay S2.' },
    { id: 'LR-00122',    name: 'Legacy-Relay-01',    protocol: 'UDP', endpointUrl: 'udp://legacy.lon.net:3000',    status: 'idle',   tier: 'Secondary', lastEmission: '2024-05-07T16:00:00', description: 'Legacy relay 01.' },
  ];

  visualizaciones: Visualizacion[] = [
    {
      idRelay: 1,
      idAmbiente: 1,
      idUnidad: 'U001',
      patente: '032LCM',
      fechaHoraDesde: '2024-09-27T00:00:00',
      fechaHoraHasta: '',
      fechaActualizacion: '',
      idRelayNavigation: { idRelay: 1, nombre: 'SOFLEX_PBA' },
      idAmbienteNavigation: { idAmbiente: 1, nombre: 'MEGATRANS_PRIVADOS' }
    },
    {
      idRelay: 2,
      idAmbiente: 2,
      idUnidad: 'U002',
      patente: 'ABC123',
      fechaHoraDesde: '2024-10-01T08:00:00',
      fechaHoraHasta: '2024-10-01T20:00:00',
      fechaActualizacion: '2024-10-01T20:05:00',
      idRelayNavigation: { idRelay: 2, nombre: 'RELAY_CENTRAL' },
      idAmbienteNavigation: { idAmbiente: 2, nombre: 'AMBIENTE_PROD' }
    },
    {
      idRelay: 3,
      idAmbiente: 1,
      idUnidad: 'U003',
      patente: 'XYZ789',
      fechaHoraDesde: '2024-11-15T14:00:00',
      fechaHoraHasta: '',
      fechaActualizacion: '2024-11-15T14:45:00',
      idRelayNavigation: { idRelay: 3, nombre: 'SOFLEX_S2' },
      idAmbienteNavigation: { idAmbiente: 1, nombre: 'MEGATRANS_PRIVADOS' }
    },
    {
      idRelay: 1,
      idAmbiente: 3,
      idUnidad: 'U004',
      patente: 'AAA111',
      fechaHoraDesde: '2024-12-01T10:00:00',
      fechaHoraHasta: '',
      fechaActualizacion: '2024-12-01T10:05:00',
      idRelayNavigation: { idRelay: 1, nombre: 'SOFLEX_PBA' },
      idAmbienteNavigation: { idAmbiente: 3, nombre: 'AMBIENTE_DEV' }
    },
    {
      idRelay: 2,
      idAmbiente: 1,
      idUnidad: 'U005',
      patente: 'BBB222',
      fechaHoraDesde: '2025-01-10T12:00:00',
      fechaHoraHasta: '2025-01-10T18:00:00',
      fechaActualizacion: '2025-01-10T18:30:00',
      idRelayNavigation: { idRelay: 2, nombre: 'RELAY_CENTRAL' },
      idAmbienteNavigation: { idAmbiente: 1, nombre: 'MEGATRANS_PRIVADOS' }
    },
    {
      idRelay: 3,
      idAmbiente: 2,
      idUnidad: 'U006',
      patente: 'CCC333',
      fechaHoraDesde: '2025-02-05T09:00:00',
      fechaHoraHasta: '',
      fechaActualizacion: '2025-02-05T09:15:00',
      idRelayNavigation: { idRelay: 3, nombre: 'SOFLEX_S2' },
      idAmbienteNavigation: { idAmbiente: 2, nombre: 'AMBIENTE_PROD' }
    },
    {
      idRelay: 1,
      idAmbiente: 2,
      idUnidad: 'U007',
      patente: 'DDD444',
      fechaHoraDesde: '2025-03-20T16:00:00',
      fechaHoraHasta: '2025-03-20T22:00:00',
      fechaActualizacion: '2025-03-20T22:10:00',
      idRelayNavigation: { idRelay: 1, nombre: 'SOFLEX_PBA' },
      idAmbienteNavigation: { idAmbiente: 2, nombre: 'AMBIENTE_PROD' }
    },
    {
      idRelay: 2,
      idAmbiente: 3,
      idUnidad: 'U008',
      patente: 'EEE555',
      fechaHoraDesde: '2025-04-12T11:00:00',
      fechaHoraHasta: '',
      fechaActualizacion: '2025-04-12T11:20:00',
      idRelayNavigation: { idRelay: 2, nombre: 'RELAY_CENTRAL' },
      idAmbienteNavigation: { idAmbiente: 3, nombre: 'AMBIENTE_DEV' }
    }
  ];

  visualizacionesGCBA: VisualizacionGCBA[] = [
    {
      idRelay: 1,
      idAmbiente: 1,
      idUnidad: 'LQUE001',
      patente: 'LQUE001',
      fechaHoraDesde: '2026-05-05T13:29:33',
      fechaHoraHasta: '',
      fechaHoraGps: '2026-05-05T17:31:12',
      fechaActualizacion: '2026-05-05T14:45:29',
      idRelayNavigation: { idRelay: 1, nombre: 'SOFLEX_PBA' },
      idAmbienteNavigation: { idAmbiente: 1, nombre: 'MEGATRANS_PRIVADOS' }
    },
    {
      idRelay: 2,
      idAmbiente: 2,
      idUnidad: 'GCBA-002',
      patente: 'ABC123',
      fechaHoraDesde: '2026-05-07T10:00:00',
      fechaHoraHasta: '2026-05-07T20:00:00',
      fechaHoraGps: '2026-05-07T18:15:00',
      fechaActualizacion: '2026-05-07T18:18:00',
      idRelayNavigation: { idRelay: 2, nombre: 'RELAY_CENTRAL' },
      idAmbienteNavigation: { idAmbiente: 2, nombre: 'AMBIENTE_PROD' }
    },
    {
      idRelay: 3,
      idAmbiente: 1,
      idUnidad: 'GCBA-003',
      patente: 'XYZ789',
      fechaHoraDesde: '2026-05-01T00:00:00',
      fechaHoraHasta: '2026-05-06T00:00:00',
      fechaHoraGps: '2026-05-05T23:50:00',
      fechaActualizacion: '2026-05-05T23:55:00',
      idRelayNavigation: { idRelay: 3, nombre: 'SOFLEX_S2' },
      idAmbienteNavigation: { idAmbiente: 1, nombre: 'MEGATRANS_PRIVADOS' }
    },
    {
      idRelay: 1,
      idAmbiente: 2,
      idUnidad: 'GCBA-004',
      patente: 'DEF456',
      fechaHoraDesde: '2026-05-07T08:00:00',
      fechaHoraHasta: '',
      fechaHoraGps: '2026-05-07T17:50:00',
      fechaActualizacion: '2026-05-07T18:05:00',
      idRelayNavigation: { idRelay: 1, nombre: 'SOFLEX_PBA' },
      idAmbienteNavigation: { idAmbiente: 2, nombre: 'AMBIENTE_PROD' }
    },
    {
      idRelay: 2,
      idAmbiente: 3,
      idUnidad: 'GCBA-005',
      patente: 'TRN-999',
      fechaHoraDesde: '2026-05-07T00:00:00',
      fechaHoraHasta: '',
      fechaHoraGps: '2026-05-07T18:37:00',
      fechaActualizacion: '2026-05-07T18:38:00', // Active case (< 5 min ago)
      idRelayNavigation: { idRelay: 2, nombre: 'RELAY_CENTRAL' },
      idAmbienteNavigation: { idAmbiente: 3, nombre: 'AMBIENTE_DEV' }
    }
  ];

  availableRelays: Relay[] = [
    { idRelay: 1, nombre: 'SOFLEX_PBA' },
    { idRelay: 2, nombre: 'RELAY_CENTRAL' },
    { idRelay: 3, nombre: 'SOFLEX_S2' },
  ];

  availableAmbientes: Ambiente[] = [
    { idAmbiente: 1, nombre: 'MEGATRANS_PRIVADOS' },
    { idAmbiente: 2, nombre: 'AMBIENTE_PROD' },
    { idAmbiente: 3, nombre: 'AMBIENTE_DEV' },
  ];

  activityLogs: ActivityLog[] = [
    { icon: 'sync', title: 'Relay Cluster A-14 Re-synchronization', subtitle: 'Node ID: DNF-F921 · Location: Frankfurt, DE', time: '2 minutes ago', status: 'SUCCESS' },
    { icon: 'warn', title: 'Anomalous Traffic Spike Detected',       subtitle: 'Internal IP Range: 10.0.4.1/24 · Security Layer 2', time: '14 minutes ago', status: 'INVESTIGATING' },
    { icon: 'clock', title: 'Firmware Update Propagated (v4.2.1)',   subtitle: 'All Nodes · Automatic Deployment', time: '1 hour ago', status: 'COMPLETED' },
    { icon: 'sync', title: 'Relay West-Epsilon Reconnected',         subtitle: 'Node ID: RW-E-055-3M · Location: London, UK', time: '2 hours ago', status: 'SUCCESS' },
    { icon: 'warn', title: 'High Latency Threshold Breached',        subtitle: 'Node: RN-B-002-4I · Latency: 142ms', time: '3 hours ago', status: 'INVESTIGATING' },
    { icon: 'clock', title: 'Routine Health Check Completed',        subtitle: 'All 13 nodes checked · 11 passed', time: '6 hours ago', status: 'COMPLETED' },
  ];

  throughputHours = ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'];
  throughputData  = [0.8, 1.1, 0.9, 1.3, 1.6, 1.9, 1.4, 1.8, 2.1, 1.7, 1.5, 1.2];

  regionalData = {
    labels: ['NA-Central', 'EU-West', 'EU-Central', 'AP-South', 'AP-East', 'SA-South'],
    inbound:  [0.42, 0.31, 0.18, 0.22, 0.15, 0.08],
    outbound: [0.38, 0.28, 0.16, 0.19, 0.13, 0.07],
  };

  private getLocalISOString(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }

  stopGCBA(idUnidad: string, idRelay: number, idAmbiente: number) {
    const index = this.visualizacionesGCBA.findIndex(
      v => v.idUnidad === idUnidad && v.idRelay === idRelay && v.idAmbiente === idAmbiente
    );
    if (index !== -1) {
      const now = new Date();
      // Set to 1 second ago to ensure it's immediately "Inactivo"
      const stopDate = new Date(now.getTime() - 1000);
      const stopTimeString = this.getLocalISOString(stopDate);
      
      this.visualizacionesGCBA[index] = {
        ...this.visualizacionesGCBA[index],
        fechaHoraHasta: stopTimeString,
        fechaActualizacion: this.getLocalISOString(now),
        usuario: 'admin_user'
      };
      this.visualizacionesGCBA = [...this.visualizacionesGCBA];
    }
  }

  resumeGCBA(idUnidad: string, idRelay: number, idAmbiente: number) {
    const index = this.visualizacionesGCBA.findIndex(
      v => v.idUnidad === idUnidad && v.idRelay === idRelay && v.idAmbiente === idAmbiente
    );
    if (index !== -1) {
      const now = this.getLocalISOString(new Date());
      this.visualizacionesGCBA[index] = {
        ...this.visualizacionesGCBA[index],
        fechaHoraHasta: undefined,
        fechaActualizacion: now,
        usuario: 'admin_user'
      };
      this.visualizacionesGCBA = [...this.visualizacionesGCBA];
    }
  }

  deleteGCBA(idUnidad: string, idRelay: number, idAmbiente: number) {
    this.visualizacionesGCBA = this.visualizacionesGCBA.filter(
      v => !(v.idUnidad === idUnidad && v.idRelay === idRelay && v.idAmbiente === idAmbiente)
    );
  }
}

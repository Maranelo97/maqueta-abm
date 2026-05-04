import { Injectable } from '@angular/core';

export interface RelayNode {
  id: string; name: string; protocol: 'TCP' | 'UDP';
  endpointUrl: string; status: 'active' | 'down' | 'idle';
  latency?: number; error?: string; tier: 'Primary' | 'Secondary' | 'Edge';
}

export interface ActivityLog {
  icon: 'sync' | 'warn' | 'clock';
  title: string; subtitle: string;
  time: string; status: 'SUCCESS' | 'INVESTIGATING' | 'COMPLETED';
}

@Injectable({ providedIn: 'root' })
export class RelayService {
  relays: RelayNode[] = [
    { id: 'RN-A-001-9X', name: 'Relay North-Alpha', protocol: 'TCP', endpointUrl: 'tcp://relay.us-east.net:8080', status: 'active', latency: 12, tier: 'Primary' },
    { id: 'RN-B-002-4I', name: 'Relay North-Beta',  protocol: 'UDP', endpointUrl: 'udp://relay.us-east.net:9001', status: 'active', latency: 18, tier: 'Primary' },
    { id: 'RS-G-095-1Z', name: 'Relay South-Gamma', protocol: 'TCP', endpointUrl: 'tcp://relay.sa-south.net:443',  status: 'down',   error: 'Connection Lost: 4m ago', tier: 'Edge' },
    { id: 'RE-D-016-7L', name: 'Relay East-Delta',  protocol: 'TCP', endpointUrl: 'tcp://relay.eu-east.net:8080', status: 'active', latency: 9,  tier: 'Primary' },
    { id: 'RW-E-055-3M', name: 'Relay West-Epsilon',protocol: 'UDP', endpointUrl: 'udp://bridge.fra-1.net:9001',  status: 'active', latency: 22, tier: 'Secondary' },
    { id: 'RC-Z-102-8R', name: 'Relay Central-Zeta',protocol: 'TCP', endpointUrl: 'tcp://relay.eu-west.net:8080', status: 'active', latency: 5,  tier: 'Primary' },
    { id: 'RC-H-103-2E', name: 'Relay Central-Eta', protocol: 'UDP', endpointUrl: 'udp://relay.eu-cent.net:9001', status: 'active', latency: 7,  tier: 'Secondary' },
    { id: 'RN-T-204-5K', name: 'Relay North-Theta', protocol: 'TCP', endpointUrl: 'tcp://auth.ap-south.net:443',  status: 'down',   error: 'Authentication Error', tier: 'Edge' },
    { id: 'RE-I-615-1V', name: 'Relay East-Iota',   protocol: 'TCP', endpointUrl: 'tcp://relay.ap-east.net:8080', status: 'active', latency: 14, tier: 'Primary' },
    { id: 'ER-04922',    name: 'Edge-Relay-North',   protocol: 'TCP', endpointUrl: 'tcp://relay.us-east.net:8080', status: 'active', latency: 11, tier: 'Edge' },
    { id: 'CB-12994',    name: 'Core-Bridge-Delta',  protocol: 'UDP', endpointUrl: 'udp://bridge.fra-1.net:9001',  status: 'active', latency: 8,  tier: 'Secondary' },
    { id: 'AR-99031',    name: 'Auth-Relay-S2',      protocol: 'TCP', endpointUrl: 'tcp://auth.ap-south.net:443',  status: 'down',   error: 'Connection Lost', tier: 'Edge' },
    { id: 'LR-00122',    name: 'Legacy-Relay-01',    protocol: 'UDP', endpointUrl: 'udp://legacy.lon.net:3000',    status: 'idle',   tier: 'Secondary' },
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
}

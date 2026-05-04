import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type NotifKey = 'emailAlerts' | 'smsAlerts' | 'criticalOnly';

interface NotifItem {
  key: NotifKey;
  label: string;
  desc: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  profile = { name: 'Jonathan Drake', email: 'j.drake@enterprise.com', role: 'Infrastructure Admin' };
  network = { timeout: 30, retries: 3, encryptionLevel: 'AES-256', auditFrequency: 'Real-time' };
  notifications: Record<NotifKey, boolean> = {
    emailAlerts: true,
    smsAlerts: false,
    criticalOnly: false,
  };

  notifItems: NotifItem[] = [
    { key: 'emailAlerts',  label: 'Email Alerts',   desc: 'Receive relay event notifications via email' },
    { key: 'smsAlerts',    label: 'SMS Alerts',     desc: 'Receive critical alerts via SMS' },
    { key: 'criticalOnly', label: 'Critical Only',  desc: 'Only receive notifications for critical events' },
  ];
}

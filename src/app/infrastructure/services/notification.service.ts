import { Injectable, signal } from '@angular/core';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly notifications = signal<NotificationItem[]>([]);

  push(partial: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>): void {
    const now = new Date().toISOString();
    const item: NotificationItem = {
      id: Math.random().toString(36).slice(2),
      createdAt: now,
      read: false,
      ...partial
    };

    this.notifications.update((items) => [item, ...items]);
  }

  markAsRead(id: string): void {
    this.notifications.update((items) =>
      items.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  markAllAsRead(): void {
    this.notifications.update((items) => items.map((n) => ({ ...n, read: true })));
  }

  clear(): void {
    this.notifications.set([]);
  }
}

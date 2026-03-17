import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { NotificationService } from '../../infrastructure/services/notification.service';

@Component({
  selector: 'app-notifications-page',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  templateUrl: './notifications.page.html'
})
export class NotificationsPage implements OnInit {
  private readonly notificationsService = inject(NotificationService);

  readonly notifications = this.notificationsService.notifications;

  readonly unreadCount = computed(() =>
    this.notifications().filter((n) => !n.read).length
  );

  ngOnInit(): void {
    if (this.notifications().length === 0) {
      this.seedDemoNotifications();
    }
  }

  markOneAsRead(id: string): void {
    this.notificationsService.markAsRead(id);
  }

  markAllAsRead(): void {
    this.notificationsService.markAllAsRead();
  }

  clear(): void {
    this.notificationsService.clear();
  }

  private seedDemoNotifications(): void {
    this.notificationsService.push({
      type: 'info',
      title: 'Bienvenido al módulo de notificaciones',
      message: 'Aquí verás mensajes importantes del sistema.'
    });
    this.notificationsService.push({
      type: 'success',
      title: 'Proyecto creado',
      message: 'Tu último proyecto de ejemplo se ha configurado correctamente.'
    });
  }
}

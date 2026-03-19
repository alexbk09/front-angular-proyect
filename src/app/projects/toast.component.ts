import { Component, signal, computed } from '@angular/core';
import { ToastService } from './toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <div *ngFor="let toast of toasts()" [ngClass]="toast.type === 'success' ? 'bg-green-500' : 'bg-red-600'" class="text-white px-4 py-2 rounded shadow">
        {{ toast.message }}
      </div>
    </div>
  `
})
export class ToastComponent {
  toasts = signal<{ message: string; type: 'success' | 'error' }[]>([]);
}

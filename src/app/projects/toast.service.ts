import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts: { message: string; type: 'success' | 'error' }[] = [];

  getToasts() {
    return this.toasts;
  }

  show(message: string, type: 'success' | 'error' = 'success') {
    this.toasts.push({ message, type });
    setTimeout(() => this.toasts.shift(), 3500);
  }
}

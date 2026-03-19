import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-project-delete-modal',
  standalone: true,
  template: `
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 class="text-lg font-bold mb-4">¿Eliminar proyecto?</h2>
        <p class="mb-6">Esta acción no se puede deshacer.</p>
        <div class="flex justify-end gap-2">
          <button class="px-4 py-2 bg-gray-200 rounded" (click)="cancel.emit()">Cancelar</button>
          <button class="px-4 py-2 bg-red-600 text-white rounded" (click)="confirm.emit()">Eliminar</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: []
})
export class ProjectDeleteModalComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}

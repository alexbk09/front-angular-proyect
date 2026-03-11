import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'layout-menu',
  standalone: true,
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  @Output() close = new EventEmitter<void>();
}

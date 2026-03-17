import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'default' = 'primary';
  @Input() label = 'Button';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}

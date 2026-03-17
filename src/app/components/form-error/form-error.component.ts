import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'ui-form-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-error.component.html'
})
export class FormErrorComponent {
  @Input() control: AbstractControl | null = null;
  @Input() messages: Record<string, string> | null = null;
  @Input() fallbackMessage = 'Este campo no es válido.';

  get message(): string | null {
    const control = this.control;

    if (!control || !control.touched || !control.invalid) {
      return null;
    }

    const errors = control.errors;
    if (!errors) {
      return null;
    }

    const [firstKey] = Object.keys(errors);
    if (!firstKey) {
      return null;
    }

    if (this.messages && this.messages[firstKey]) {
      return this.messages[firstKey];
    }

    return this.fallbackMessage;
  }
}

import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './settings.page.html'
})
export class SettingsPage {}

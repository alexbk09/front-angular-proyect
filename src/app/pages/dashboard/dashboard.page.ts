import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CardComponent, ButtonComponent],
  templateUrl: './dashboard.page.html'
})
export class DashboardPage {}

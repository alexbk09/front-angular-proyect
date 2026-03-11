import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {}

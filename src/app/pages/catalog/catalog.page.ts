import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './catalog.page.html'
})
export class CatalogPage {}

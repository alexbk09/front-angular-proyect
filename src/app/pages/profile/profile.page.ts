import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './profile.page.html'
})
export class ProfilePage {}

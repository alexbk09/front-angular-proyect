import { Component } from '@angular/core';
import { HeroComponent } from '../../components/home/hero/hero.component';
import { ProductivityComponent } from '../../components/home/productivity/productivity.component';
import { ActionComponent } from '../../components/home/action/action.component';
import { EmailMagicComponent } from '../../components/home/email-magic/email-magic.component';
import { IntegrationsComponent } from '../../components/home/integrations/integrations.component';
import { TestimonialComponent } from '../../components/home/testimonial/testimonial.component';
import { BrandsComponent } from '../../components/home/brands/brands.component';
import { CtaComponent } from '../../components/home/cta/cta.component';

@Component({
  selector: 'app-inicio-page',
  standalone: true,
  imports: [
    HeroComponent,
    ProductivityComponent,
    ActionComponent,
    EmailMagicComponent,
    IntegrationsComponent,
    TestimonialComponent,
    BrandsComponent,
    CtaComponent,
  ],
  templateUrl: './inicio.page.html'
})
export class InicioPage {}

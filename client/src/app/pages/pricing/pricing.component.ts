import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, HeaderComponent],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent {
  
}

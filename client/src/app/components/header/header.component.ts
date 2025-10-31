import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, MenubarModule, DialogModule, AppointmentDialogComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private router = inject(Router);
  
  showAppointmentDialog = false;
  mobileMenuOpen = false;
  
  menuItems = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => this.router.navigate(['/home'])
    },
    {
      label: 'About Us',
      icon: 'pi pi-info-circle',
      command: () => this.router.navigate(['/about'])
    },
    {
      label: 'Pricing',
      icon: 'pi pi-dollar',
      command: () => this.router.navigate(['/pricing'])
    },
    {
      label: 'Contact Us',
      icon: 'pi pi-phone',
      command: () => this.router.navigate(['/contact'])
    }
  ];

  openAppointmentDialog() {
    this.showAppointmentDialog = true;
  }

  closeAppointmentDialog() {
    this.showAppointmentDialog = false;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}

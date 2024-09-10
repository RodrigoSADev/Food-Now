import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  isFooterBottom = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url;
        if (currentUrl === '/confirm-order' || currentUrl === '/checkout') {
          this.isFooterBottom = true;
        } else {
          this.isFooterBottom = false;
        }
      }
    });
  }
}

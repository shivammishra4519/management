import { Component } from '@angular/core';

@Component({
  selector: 'app-app-view',
  templateUrl: './app-view.component.html',
  styleUrl: './app-view.component.css'
})
export class AppViewComponent {
  navOpen = false;

  toggleNavbar(event: Event) {
    event.stopPropagation(); // Prevent the click from bubbling up to the body
    this.navOpen = !this.navOpen;
  }

  onBodyClick(event: Event) {
    if (this.navOpen) {
      const target = event.target as HTMLElement;
      if (!target.closest('.navbar-container')) {
        this.navOpen = false;
      }
    }
  }
}

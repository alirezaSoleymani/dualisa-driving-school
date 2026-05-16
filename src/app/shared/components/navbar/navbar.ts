import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContentService } from '../../services/content/content-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  contentService = inject(ContentService);
  content = signal<any>(null);
  dropdownContent: any;

  isMenuOpen = signal(false);
  isSubmenuOpen = signal(false);

  openMenu(event: Event) {
    event.preventDefault();
    this.isMenuOpen.set(true);
  }

  closeMenus(event: Event) {
    this.isMenuOpen.set(false);
    this.isSubmenuOpen.set(false);
  }

  toggleSubmenu(event: Event) {
    event.preventDefault();
    this.isSubmenuOpen.update((state) => !state);
  }

  ngOnInit(): void {
    this.contentService.getContent('navbar').subscribe((data) => {
      this.content.set(data);
    });

    this.contentService.getContent('services').subscribe((data) => {
      this.dropdownContent = data.servicesDetails;
    });
  }
}

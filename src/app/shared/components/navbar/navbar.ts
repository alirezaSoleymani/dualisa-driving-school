import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContentService } from '../../services/content/content-service';
import { IMenu } from '../../models/menu.model';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  host: {
    '[class.scrolled]': 'scrolled()',
  },
})
export class Navbar implements OnInit, AfterViewInit {
  contentService = inject(ContentService);
  content = signal<any>(null);

  private el = inject(ElementRef);
  private threshold = 0;

  isMenuOpen = signal(false);
  isSubmenuOpen = signal(false);
  scrolled = signal(false);

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
  }

  ngAfterViewInit(): void {
    this.updateThreshold();

    window.addEventListener('resize', () => this.updateThreshold());
  }

  @HostListener('window:keydown', ['$event'])
  handleEscape(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isMenuOpen()) {
      this.closeMenus(event);
      event.preventDefault();
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const newScrolled = window.scrollY >= this.threshold;

    if (newScrolled !== this.scrolled()) {
      this.scrolled.set(newScrolled);
    }
  }

  updateThreshold() {
    const navbar = this.el.nativeElement;
    const rect = navbar.getBoundingClientRect();

    this.threshold = rect.bottom + window.scrollY;
  }
}

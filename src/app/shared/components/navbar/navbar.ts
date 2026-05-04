import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content/content-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  contentService = inject(ContentService);
  content = signal<any>(null);

  ngOnInit(): void {
    this.contentService.getContent('navbar').subscribe((data) => {
      this.content.set(data);
    });
  }
}

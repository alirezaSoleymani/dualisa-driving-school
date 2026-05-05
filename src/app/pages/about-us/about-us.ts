import { ContentService } from '../../shared/services/content/content-service';
import { Navbar } from './../../shared/components/navbar/navbar';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-about-us',
  imports: [Navbar],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs {
  contentService = inject(ContentService);

  content = signal<any>(null);

  ngOnInit(): void {
    this.contentService.getContent('aboutUs').subscribe((data) => {
      this.content.set(data);
    });
  }
}

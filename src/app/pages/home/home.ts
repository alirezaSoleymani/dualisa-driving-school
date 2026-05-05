import { Component, inject, signal } from '@angular/core';
import { ContentService } from '../../shared/services/content/content-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  contentService = inject(ContentService);

  content = signal<any>(null);

  ngOnInit(): void {
    this.contentService.getContent('home').subscribe((data) => {
      this.content.set(data);
    });
  }
}

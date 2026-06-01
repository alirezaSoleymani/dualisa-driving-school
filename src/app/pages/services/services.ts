import { Component, inject, signal } from '@angular/core';
import { ContentService } from '../../shared/services/content/content-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  contentService = inject(ContentService);

  content = signal<any>(null);

  ngOnInit(): void {
    this.contentService.getContent('services').subscribe((data) => {
      this.content.set(data);
    });
  }
}

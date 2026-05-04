import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content/content-service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit {
  contentService = inject(ContentService);

  content = signal<any>(null);

  ngOnInit(): void {
    this.contentService.getContent('footer').subscribe((data) => {
      this.content.set(data);
    });
  }
}

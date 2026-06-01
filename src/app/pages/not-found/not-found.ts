import { Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../../shared/services/content/content-service';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound implements OnInit {
  contentService = inject(ContentService);

  content: any;

  ngOnInit(): void {
    this.contentService.getContent('notFound').subscribe((data) => {
      this.content = data;
    });
  }
}

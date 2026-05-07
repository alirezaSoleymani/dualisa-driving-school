import { Component, inject, OnInit, signal } from '@angular/core';
import { ContentService } from '../../shared/services/content/content-service';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-contact-us',
  imports: [Navbar],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss',
})
export class ContactUs implements OnInit {
  contentService = inject(ContentService);
  content = signal<any>(null);

  ngOnInit(): void {
    this.contentService.getContent('contactUs').subscribe((data) => {
      this.content.set(data);
    });
  }
}

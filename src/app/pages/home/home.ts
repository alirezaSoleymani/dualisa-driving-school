import { ModalService } from './../../shared/services/modal/modal-service';
import { Component, inject, signal } from '@angular/core';
import { ContentService } from '../../shared/services/content/content-service';
import { ContactForm } from '../../shared/components/contact-form/contact-form';

@Component({
  selector: 'app-home',
  imports: [ContactForm],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  contentService = inject(ContentService);
  modalService = inject(ModalService);
  content = signal<any>(null);

  ngOnInit(): void {
    this.contentService.getContent('home').subscribe((data) => {
      this.content.set(data);
    });
  }
}

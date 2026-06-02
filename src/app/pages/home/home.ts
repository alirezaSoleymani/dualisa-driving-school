import { ModalService } from './../../shared/services/modal/modal-service';
import { Component, inject, signal } from '@angular/core';
import { ContentService } from '../../shared/services/content/content-service';
import { ContactForm } from '../../shared/components/contact-form/contact-form';
import { Tab } from '../../shared/components/tab/tab';
import { ContentSlider } from '../../shared/components/content-slider/content-slider';
import { Service } from '../../shared/models/service.model';

@Component({
  selector: 'app-home',
  imports: [ContactForm, Tab, ContentSlider],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  contentService = inject(ContentService);
  modalService = inject(ModalService);
  content = signal<any>(null);
  servicesContent = signal<any>(null);

  ngOnInit(): void {
    this.contentService.getContent('home').subscribe((data) => {
      this.content.set(data);
    });

    this.contentService.getContent('services').subscribe((data) => {
      this.servicesContent.set(data);
      console.log(this.servicesContent());
    });
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { ContentService } from '../../shared/services/content/content-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../shared/models/service.model';
import { SeoService } from '../../shared/services/seo/seo-service';
import { config } from '../../../config';
import { ContactForm } from '../../shared/components/contact-form/contact-form';
import { ModalService } from '../../shared/services/modal/modal-service';

@Component({
  selector: 'app-service-details',
  imports: [ContactForm],
  templateUrl: './service-details.html',
  styleUrl: './service-details.scss',
})
export class ServiceDetails implements OnInit {
  contentService = inject(ContentService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  seoService = inject(SeoService);
  modalService = inject(ModalService);

  service: any;
  servicesData: any;
  bgStyle: any;

  // isModalOpen = signal(false);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) this.loadService(id);
      else this.router.navigate(['/services']);
    });
  }

  loadService(id: string) {
    this.contentService.getContent('services').subscribe((data) => {
      this.servicesData = data;

      const service = data.servicesDetails.find(
        (service: Service) => service.id === id,
      );

      if (service) {
        this.service = service;
        this.bgStyle = `linear-gradient(to bottom,rgba(37, 37, 37, 0.32),rgba(37, 37, 37, 1)), url("${this.service.imagePath}")`;

        const currentPath = this.router.url.split('?')[0];

        const seoData = service.seo;
        console.log(seoData);
        const absoluteUrl = `${config.baseUrl}${currentPath}`;
        console.log(absoluteUrl);
        const absoluteImageUrl = seoData.image
          ? `${config.baseUrl}${seoData.image}`
          : undefined;

        this.seoService.updatePageMetaData({
          ...seoData,
          url: absoluteUrl,
          image: absoluteImageUrl,
        });
      }
    });
  }
}

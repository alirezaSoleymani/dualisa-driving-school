import { Navbar } from './../../shared/components/navbar/navbar';
import { Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../../shared/services/content/content-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../shared/models/service.model';
import { SeoService } from '../../shared/services/seo/seo-service';
import { config } from '../../../config';

@Component({
  selector: 'app-service-details',
  imports: [Navbar],
  templateUrl: './service-details.html',
  styleUrl: './service-details.scss',
})
export class ServiceDetails implements OnInit {
  contentService = inject(ContentService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  seoService = inject(SeoService);

  service: any;
  servicesData: any;

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
          absoluteUrl,
          absoluteImageUrl,
        });
      }
    });
  }
}

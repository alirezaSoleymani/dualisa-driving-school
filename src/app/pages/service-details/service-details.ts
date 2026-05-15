import { Component, inject, OnInit } from '@angular/core';
import { ContentService } from '../../shared/services/content/content-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../shared/models/service.model';

@Component({
  selector: 'app-service-details',
  imports: [],
  templateUrl: './service-details.html',
  styleUrl: './service-details.scss',
})
export class ServiceDetails implements OnInit {
  contentService = inject(ContentService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  content: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) this.loadService(id);
      else this.router.navigate(['/services']);
    });
  }

  loadService(id: string) {
    this.contentService.getContent('services').subscribe((data) => {
      this.content = data.servicesDetails.find(
        (service: Service) => service.id === id,
      );
    });
  }
}

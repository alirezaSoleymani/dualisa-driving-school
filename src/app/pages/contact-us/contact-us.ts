import { Component, inject, OnInit, signal } from '@angular/core';
import { ContentService } from '../../shared/services/content/content-service';
import { Navbar } from '../../shared/components/navbar/navbar';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-contact-us',
  imports: [Navbar, GoogleMapsModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss',
})
export class ContactUs implements OnInit {
  contentService = inject(ContentService);
  content = signal<any>(null);

  center: google.maps.LatLngLiteral = { lat: 46.9505069, lng: 7.4356473 };
  zoom = 14;
  markerPosition: google.maps.LatLngLiteral = {
    lat: 46.9505069,
    lng: 7.4356473,
  };

  ngOnInit(): void {
    this.contentService.getContent('contactUs').subscribe((data) => {
      this.content.set(data);
    });
  }
}

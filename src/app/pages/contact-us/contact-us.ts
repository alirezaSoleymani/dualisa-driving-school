import { Component, inject, OnInit, signal } from '@angular/core';
import { ContentService } from '../../shared/services/content/content-service';
import { GoogleMapsModule } from '@angular/google-maps';
import { ContactForm } from '../../shared/components/contact-form/contact-form';

@Component({
  selector: 'app-contact-us',
  imports: [GoogleMapsModule, ContactForm],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss',
})
export class ContactUs implements OnInit {
  contentService = inject(ContentService);
  content = signal<any>(null);

  center: google.maps.LatLngLiteral = { lat: 46.9505069, lng: 7.4356473 };
  zoom = 17;
  markerPosition: google.maps.LatLngLiteral = {
    lat: 46.9505069,
    lng: 7.4356473,
  };

  mapMarkerOptions: google.maps.MarkerOptions = {
    icon: {
      url: '/images/icons/map-marker-icon.svg',
    },
  };

  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    mapTypeId: 'roadmap',
    styles: [
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#d3d3d3',
          },
        ],
      },
      {
        featureType: 'transit',
        stylers: [
          {
            color: '#808080',
          },
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          {
            visibility: 'on',
          },
          {
            color: '#b3b3b3',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
      {
        featureType: 'road.local',
        elementType: 'geometry.fill',
        stylers: [
          {
            visibility: 'on',
          },
          {
            color: '#ffffff',
          },
          {
            weight: 1.8,
          },
        ],
      },
      {
        featureType: 'road.local',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#d7d7d7',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'geometry.fill',
        stylers: [
          {
            visibility: 'on',
          },
          {
            color: '#ebebeb',
          },
        ],
      },
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
          {
            color: '#a7a7a7',
          },
        ],
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [
          {
            visibility: 'on',
          },
          {
            color: '#efefef',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#696969',
          },
        ],
      },
      {
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [
          {
            visibility: 'on',
          },
          {
            color: '#737373',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#d6d6d6',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#dadada',
          },
        ],
      },
    ],
  };

  ngOnInit(): void {
    this.contentService.getContent('contactUs').subscribe((data) => {
      this.content.set(data);
    });
  }
}

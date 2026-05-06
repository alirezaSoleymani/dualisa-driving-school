import { ContentService } from '../../shared/services/content/content-service';
import { Navbar } from './../../shared/components/navbar/navbar';
import {
  Component,
  inject,
  signal,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
// import { SwiperComponent, SwiperSlideDirective } from 'swiper/angular';
// import { Navigation } from 'swiper/modules';
// import { register } from 'swiper/element/bundle';
import 'swiper/css';
import 'swiper/css/navigation';

@Component({
  selector: 'app-about-us',
  imports: [Navbar],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AboutUs {
  contentService = inject(ContentService);

  content = signal<any>(null);
  images = [
    '/images/car-photo.png',
    '/images/car-photo.png',
    '/images/car-photo.png',
    '/images/car-photo.png',
    '/images/car-photo.png',
    '/images/car-photo.png',
  ];

  ngOnInit(): void {
    this.contentService.getContent('aboutUs').subscribe((data) => {
      this.content.set(data);
    });
  }
}

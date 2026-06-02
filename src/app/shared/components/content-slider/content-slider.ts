import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import 'swiper/css';
import 'swiper/css/navigation';
import { Service } from '../../models/service.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-content-slider',
  imports: [RouterLink],
  templateUrl: './content-slider.html',
  styleUrl: './content-slider.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContentSlider {
  slides = input<Service[]>([]);
  cardLabel = input('');
  btnText = input('');
}

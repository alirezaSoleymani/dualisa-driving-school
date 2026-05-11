import { ContentService } from '../../services/content/content-service';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm implements OnInit {
  contentService = inject<any>(ContentService);

  content = signal<any>(null);
  headline = input('');
  subheadline = input('');

  contactForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    message: new FormControl(''),
  });

  ngOnInit(): void {
    this.contentService.getContent('contactForm').subscribe((data: any) => {
      this.content.set(data);
    });
  }
}

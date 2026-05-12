import { config } from './../../../../config';
import { HttpClient } from '@angular/common/http';
import { ContentService } from '../../services/content/content-service';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm implements OnInit {
  contentService = inject<any>(ContentService);
  http = inject(HttpClient);

  content = signal<any>(null);
  headline = input('');
  subheadline = input('');

  contactForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    message: new FormControl(''),
    captchaToken: new FormControl('', Validators.required),
    _honey: new FormControl(''),
  });

  ngOnInit(): void {
    (window as any).onCaptchaTokenReceived = (token: string) => {
      this.contactForm.controls.captchaToken.setValue(token);
    };

    this.contentService.getContent('contactForm').subscribe((data: any) => {
      this.content.set(data);
    });
  }

  onSubmit() {
    const hcaptchaToken = this.contactForm.value.captchaToken;

    const formValue = this.contactForm.value;
    const payload = new FormData();

    payload.append('access_key', config.web3forms.accessKey);
    payload.append('name', formValue.name ?? '');
    payload.append('email', formValue.email ?? '');
    payload.append('phone', formValue.phoneNumber ?? '');
    payload.append('message', formValue.message ?? '');
    payload.append('subject', 'New enquiry from driving school website');

    payload.append('h-captcha-response', hcaptchaToken ?? '');

    this.http.post(config.web3forms.endpoint, payload).subscribe({
      next: () => {
        console.log('Email sent.');
        this.contactForm.reset();

        (window as any).hcaptcha?.reset?.();
      },
      error: () => {
        console.error('Failed to send email');
        (window as any).hcaptcha?.reset?.();
      },
    });
  }
}

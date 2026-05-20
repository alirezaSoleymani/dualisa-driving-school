import { config } from './../../../../config';
import { HttpClient } from '@angular/common/http';
import { ContentService } from '../../services/content/content-service';
import {
  Component,
  HostListener,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { ModalService } from '../../services/modal/modal-service';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm implements OnInit {
  contentService = inject<any>(ContentService);
  http = inject(HttpClient);
  modalService = inject(ModalService);

  close = output();

  content = signal<any>(null);
  submitted = signal(false);

  headline = input('');
  subheadline = input('');
  modalMode = input(false);

  contactForm = new FormGroup(
    {
      name: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      message: new FormControl(''),
      _honey: new FormControl(''),
    },
    {
      validators: [
        (group: AbstractControl): ValidationErrors | null => {
          const email = group.get('email')?.value?.trim();
          const phone = group.get('phoneNumber')?.value?.trim();
          return email || phone ? null : { emailOrPhoneRequired: true };
        },
      ],
    },
  );

  ngOnInit(): void {
    this.contentService.getContent('contactForm').subscribe((data: any) => {
      this.content.set(data);
    });
  }

  onSubmit() {
    this.submitted.set(true);

    if (this.contactForm.invalid) {
      return;
    }

    const hcaptchaToken = (window as any).hcaptcha?.getResponse();

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

    this.submitted.set(false);
    this.close.emit(); // close modal
  }

  // Close modal with Esc key
  @HostListener('window:keydown', ['$event'])
  handleEscape(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.modalService.isModalOpen()) {
      this.modalService.close();
    }
  }
}

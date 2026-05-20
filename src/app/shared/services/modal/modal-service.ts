import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isModalOpen = signal(false);

  open() {
    this.isModalOpen.set(true);
  }

  close() {
    this.isModalOpen.set(false);
  }
}

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isModalOpen = signal(false);

  private originalPaddingRight = '';
  private scrollbarWidth = 0;

  open() {
    this.isModalOpen.set(true);

    if (this.scrollbarWidth === 0)
      this.scrollbarWidth = this.getScrollbarWidth();

    this.originalPaddingRight = document.body.style.paddingRight;

    document.body.style.paddingRight = `${this.scrollbarWidth}px`;
    document.body.classList.add('modal-open');
  }

  close() {
    this.isModalOpen.set(false);

    setTimeout(() => {
      document.body.style.paddingRight = this.originalPaddingRight;
      document.body.classList.remove('modal-open');
    }, 500); //wait for modal to finish closing
  }

  private getScrollbarWidth(): number {
    const div = document.createElement('div');
    div.style.overflow = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.position = 'absolute';
    div.style.top = '-9999px';
    div.style.border = 'none';
    div.style.padding = '0';
    document.body.appendChild(div);
    const width = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return width;
  }
}

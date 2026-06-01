import { ContentService } from './../../services/content/content-service';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-tab',
  imports: [],
  templateUrl: './tab.html',
  styleUrl: './tab.scss',
})
export class Tab implements OnInit {
  activeTab = signal<'new' | 'foreign'>('new');
  content: any;

  contentService = inject(ContentService);

  ngOnInit(): void {
    this.contentService.getContent('home').subscribe((data) => {
      this.content = data.tab;
      console.log(this.content);
    });
  }

  formatStepNumber(index: number): string {
    return `${String(index + 1).padStart(2, '0')}.`;
  }
}

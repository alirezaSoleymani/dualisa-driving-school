import { SeoService } from './shared/services/seo/seo-service';
import { Footer } from './shared/components/footer/footer';
import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ContentService } from './shared/services/content/content-service';
import { filter } from 'rxjs';
import { config } from '../config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'dualisa-driving-school';

  router = inject(Router);
  seoService = inject(SeoService);
  contentService = inject(ContentService);

  content = signal<any>(null);

  ngOnInit(): void {
    this.contentService.getAllContent().subscribe((fullContent) => {
      this.updateSeoForCurrentRoute(fullContent);

      this.router.events
        .pipe(filter((e) => e instanceof NavigationEnd))
        .subscribe(() => {
          this.updateSeoForCurrentRoute(fullContent);
        });
    });
  }

  private updateSeoForCurrentRoute(fullContent: any) {
    const currentPath = this.router.url.split('?')[0];

    const pageKey = this.getPageKeyFromPath(currentPath);

    const seoData = fullContent[pageKey]?.seo;
    const absoluteUrl = `${config.baseUrl}${currentPath}`;
    const absoluteImageUrl = seoData.image
      ? `${config.baseUrl}${seoData.image}`
      : undefined;

    if (seoData) {
      this.seoService.updatePageMetaData({
        ...seoData,
        image: absoluteImageUrl,
        url: absoluteUrl,
      });
    } else {
      this.seoService.updatePageMetaData({
        title: 'Dualisa Driving School',
        description: 'Professional driving school in Bern, Switzerland.',
        type: 'website',
        url: absoluteUrl,
      });
    }
  }

  private getPageKeyFromPath(path: string): string {
    const mapping: Record<string, string> = {
      '/': 'home',
      '/home': 'home',
      '/services': 'services',
      '/contact-us': 'contactUs',
      '/about-us': 'aboutUs',
    };

    return mapping[path] || 'home';
  }
}

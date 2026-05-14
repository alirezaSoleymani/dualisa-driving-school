import { inject, Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  titleService = inject(Title);
  metaService = inject(Meta);

  //<title></title>
  updateTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  //<meta name="..."/>
  updateMetaTag(name: string, content: string) {
    this.metaService.updateTag({ name: name, content: content });
  }

  //<meta propery="og:..."/>
  updateOpenGraph(property: string, content: string) {
    this.metaService.updateTag({ property: property, content: content });
  }

  //<link rel="canonical" href="..."/>
  setCanonicalUrl(url: string) {
    const linkEl: HTMLLinkElement =
      document.querySelector('link[rel="canonical"]') ||
      document.createElement('link');

    if (!linkEl.parentNode) {
      document.head.appendChild(linkEl);
      linkEl.setAttribute('rel', 'canonical');
    }

    linkEl.setAttribute('href', url);
  }

  updatePageMetaData(seoData: {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: string;
  }) {
    this.updateTitle(seoData.title);
    this.updateMetaTag('description', seoData.description);

    //Open Graph
    this.updateOpenGraph('og:title', seoData.title);
    this.updateOpenGraph('og:description', seoData.description);

    if (seoData.image) this.updateOpenGraph('og:image', seoData.image);
    if (seoData.url) this.updateOpenGraph('og:url', seoData.url);
    if (seoData.type) this.updateOpenGraph('og:type', seoData.type);

    //Canonical url
    if (seoData.url) this.setCanonicalUrl(seoData.url);
  }
}

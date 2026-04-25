import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./pages/services/services').then((m) => m.Services),
  },
  {
    path: 'services/:service-type',
    loadComponent: () =>
      import('./pages/service-details/service-details').then(
        (m) => m.ServiceDetails,
      ),
  },
  {
    path: 'contact-us',
    loadComponent: () =>
      import('./pages/contact-us/contact-us').then((m) => m.ContactUs),
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./pages/about-us/about-us').then((m) => m.AboutUs),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];

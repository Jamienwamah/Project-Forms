import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

describe('AppRoutes Integration Tests', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    // Initial setup for testing router navigation
    router.initialNavigation();
  });

  describe('Form Route Resolution', () => {
    const formTestCases = [
      // OGFS Routes
      {
        url: '/forms/OGFS/troubleshooting',
        description: 'OGFS Troubleshooting',
      },
      {
        url: '/forms/OGFS/replacement',
        description: 'OGFS Replacement',
      },
      {
        url: '/forms/OGFS/infrastructure',
        description: 'OGFS Infrastructure',
      },

      // OGCM Routes
      {
        url: '/forms/OGCM/troubleshooting',
        description: 'OGCM Troubleshooting',
      },
      {
        url: '/forms/OGCM/replacement',
        description: 'OGCM Replacement',
      },
      {
        url: '/forms/OGCM/infrastructure',
        description: 'OGCM Infrastructure',
      },

      // OST Systems Routes
      {
        url: '/forms/OST/troubleshooting',
        description: 'OST Troubleshooting',
      },
      {
        url: '/forms/OST/replacement',
        description: 'OST Replacement',
      },
      {
        url: '/forms/OST/infrastructure',
        description: 'OST Infrastructure',
      },
    ];

    formTestCases.forEach(({ url, description }) => {
      it(`should successfully navigate to ${description} (${url})`, async () => {
        const navigated = await router.navigateByUrl(url);

        expect(navigated).toBe(true);
        expect(location.path()).toBe(url);
      });
    });
  });

  describe('Wildcard & Fallback Routes', () => {
    it('should redirect unknown routes to the home page or default route', async () => {
      await router.navigateByUrl('/some/non-existent/route');

      // Update '' to your actual default route if different (e.g., '/landing' or '/')
      expect(location.path()).toBe('');
    });
  });
});
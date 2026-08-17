import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { Location } from '@angular/common';
import { LandingComponent } from './landing';
import { routes } from '../app.routes';

describe('LandingComponent Navigation Test', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture.detectChanges();
  });

  it('should navigate to OGFS troubleshooting route and match app.routes', async () => {
    const mockForm = {
      id: 'troubleshooting' as const,
      title: 'Device Troubleshooting',
      description: 'Test',
      category: 'Support',
      iconBg: '',
      iconPath: '',
    };

    // Execute the navigation logic
    component.selectCompanyAndNavigate(mockForm, 'optimum-financial');

    // Wait for async lazy-loaded component resolution
    await fixture.whenStable();

    // Verify the active URL in the location bar
    console.log('Current URL in Test:', location.path());

    expect(location.path()).toBe('/forms/OGFS/troubleshooting');
  });
});
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './routes'; // Imports src/app/routes/index.ts automatically

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes)
  ]
};
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions({
        // saltar la transicion al cargar la pagina por primera vez.
        skipInitialTransition: true,
        // Informacion de la transicion
        // onViewTransitionCreated( transitionInfo ) {
        //   console.log({ transitionInfo });
        // }
      }),
    ),
  ]
};

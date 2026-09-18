import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Esto arranca la aplicación en el navegador (renderizado 100% client-side,
// como pide la prueba: "Server rendering must not be used!")
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

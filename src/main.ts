import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { createIcons, icons } from 'lucide';



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

createIcons({ icons });
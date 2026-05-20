import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { createIcons, icons } from 'lucide';
import { register } from 'swiper/element/bundle';


register();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

createIcons({ icons });

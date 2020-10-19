import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ViewportSizeModule} from './viewport-size/viewport-size.module';
import {TestComponent} from './test.component';
import {VIEWPORT_SIZE_CONFIG} from './viewport-size/viewport-size.injection-token';
import {IConfig} from './viewport-size/config.interface';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    ViewportSizeModule
  ],
  providers: [
    {
      provide: VIEWPORT_SIZE_CONFIG,
      useValue: {
        medium: 500,
        large: 1000
      } as IConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

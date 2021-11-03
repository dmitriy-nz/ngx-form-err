import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxFormErrModule} from '../../projects/ngx-form-err/src/lib/ngx-form-err.module';
import {ShowExampleCodeComponent} from './show-example-code/show-example-code.component';
import {HttpClientModule} from '@angular/common/http';
import {HIGHLIGHT_OPTIONS, HighlightModule} from 'ngx-highlightjs';
import {TabsModule} from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    AppComponent,
    ShowExampleCodeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFormErrModule,
    HighlightModule,
    TabsModule.forRoot()
  ],
  providers: [
    // {
    //   provide: NgxFormErrStorageFactory,
    //   useClass: CustomFormErrStorageFactory
    // },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          xml: () => import('highlight.js/lib/languages/xml')
        }
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

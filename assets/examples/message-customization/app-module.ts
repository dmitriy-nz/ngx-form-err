import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {NgxFormErrModule, NgxFormErrStorageFactory} from 'ngx-form-err';
import {CustomFormErrStorageFactory} from "./custom-form-err-storage.factory";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxFormErrModule
  ],
  providers: [
    // Overloading the NgxFormErrStorageFactory standard class of your own implementation
    {
      provide: NgxFormErrStorageFactory,
      useClass: CustomFormErrStorageFactory
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

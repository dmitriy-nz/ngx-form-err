import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgxFormErrComponent} from './components/ngx-form-err.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgxFormErrStorageFactory} from './providers/ngx-form-err-storage.factory';
import {NgxFormErrConfigInjectToken} from './injection/NgxFormErrConfigInjectToken';
import {DefaultNgFormErrConfig} from './config/default.config';
import {NgxFormErrConfig} from './interfaces/NgxFormErrConfig';

@NgModule({
  declarations: [NgxFormErrComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    NgxFormErrStorageFactory,
    {
      provide: NgxFormErrConfigInjectToken,
      useValue: DefaultNgFormErrConfig
    }
  ],
  exports: [NgxFormErrComponent]
})
export class NgxFormErrModule {
  static forRoot(config: NgxFormErrConfig): ModuleWithProviders {
    const configCopy: NgxFormErrConfig = {
      mode: config.mode || DefaultNgFormErrConfig.mode,
      showWhen: config.showWhen || DefaultNgFormErrConfig.showWhen
    };
    return {
      ngModule: NgxFormErrModule,
      providers: [
        {
          provide: NgxFormErrConfigInjectToken,
          useValue: configCopy
        }
      ]
    };
  }
}

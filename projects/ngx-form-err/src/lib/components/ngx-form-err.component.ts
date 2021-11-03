import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges
} from '@angular/core';
import {AbstractControl, FormControl, FormGroupDirective, NgForm, NgModel} from '@angular/forms';
import {NgxFormErrStorageFactory} from '../providers/ngx-form-err-storage.factory';
import {ErrorGeneratorDynamic, ErrorGeneratorStorage, NgxFormErrViewLogic, NgxFormErrViewMode} from '../types';
import {NgxFormErrConfigInjectToken} from '../injection/NgxFormErrConfigInjectToken';
import {NgxFormErrConfig} from '../interfaces/NgxFormErrConfig';
import {Subscription} from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-form-err',
  templateUrl: './ngx-form-err.component.html',
  styleUrls: ['./ngx-form-err.component.scss']
})
export class NgxFormErrComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  // /* The name of the input for receiving the form controller
  // must match the name field of the input for which you want to display messages */
  // @Input() name: string;
  /* FormControl or NgModel instance */
  @Input() control: AbstractControl | FormControl | NgModel;
  /* How to display errors, only the first or list all errors */
  @Input() mode: keyof typeof NgxFormErrViewMode;
  /* When to Show Validation Errors */
  @Input() showWhen: (keyof typeof NgxFormErrViewLogic)[];

  successInit = false;
  errorsLabels: string[];
  subscriptions: Subscription;

  constructor(private errStorageFactory: NgxFormErrStorageFactory,
              private changeDetectorRef: ChangeDetectorRef,
              @Inject(NgxFormErrConfigInjectToken)
              private ngxFormErrConfig: NgxFormErrConfig,
              @Optional()
              private formGroupDirective: FormGroupDirective,
              @Optional()
              private ngForm: NgForm) {

  }


  get controlStatic(): AbstractControl {
    return (this.control instanceof NgModel) ? this.control.control : this.control;
  }

  get formStatic(): NgForm | FormGroupDirective {
    return (this.ngForm)
      ? this.ngForm
      : this.formGroupDirective
        ? this.formGroupDirective
        : null;
  }

  get isErrorVisible(): boolean {
    if (!this.errorsLabels?.length || !this.successInit) {
      return false;
    }
    for (const logic of this.showWhen) {
      switch (logic) {
        case NgxFormErrViewLogic.immediately:
          return true;
        case NgxFormErrViewLogic.dirty:
          if (this.controlStatic.dirty) {
            return true;
          }
          break;
        case NgxFormErrViewLogic.touched:
          if (this.controlStatic.touched) {
            return true;
          }
          break;
        case NgxFormErrViewLogic.formSubmitted:
          if (this.formStatic.submitted) {
            return true;
          }
          break;
      }
    }
    return false;
  }

  get errorGeneratorStorage(): ErrorGeneratorStorage {
    return this.errStorageFactory.getErrorStorage();
  }

  ngOnInit() {
    this.mode = this.mode || this.ngxFormErrConfig.mode;
    this.showWhen = this.showWhen || this.ngxFormErrConfig.showWhen;
    this.successInit = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.mode) {
      this.updateErrorLabels();
    }
  }

  ngAfterViewInit(): void {
    if (!this.ngForm && !this.formGroupDirective) {
      throw new Error(`ngx-form-err component should be used inside a form if using templated forms or inside a formGroup directive if using reactive forms`);
    }

    this.subscriptions = this.controlStatic.valueChanges.subscribe((value) => {
      this.updateErrorLabels();
    });

    this.subscriptions.add(this.formStatic.ngSubmit.subscribe(() => {
      this.updateErrorLabels();
    }));

    this.successInit = true;
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  private updateErrorLabels(): void {
    this.errorsLabels = [];
    const errorsKeys: string[] = Object.keys(this.controlStatic.errors || {});
    if (errorsKeys.length) {

      for (const errorKey of errorsKeys) {
        if (this.errorGeneratorStorage[errorKey]) {
          if (typeof this.errorGeneratorStorage[errorKey] === 'string') {
            this.errorsLabels.push(this.errorGeneratorStorage[errorKey] as string);
          } else if (typeof this.errorGeneratorStorage[errorKey] === 'function') {
            this.errorsLabels.push((this.errorGeneratorStorage[errorKey] as ErrorGeneratorDynamic)(this.controlStatic.errors[errorKey]));
          }
        } else {
          console.warn(`The descriptions for the validator with the key ${errorKey} are not described in the repository`);
          this.errorsLabels.push(errorKey);
        }
        if (this.mode === 'single') {
          break;
        }
      }
    }
  }

}

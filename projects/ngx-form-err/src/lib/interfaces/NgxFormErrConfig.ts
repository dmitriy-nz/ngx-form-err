import {NgxFormErrViewLogic, NgxFormErrViewMode} from '../types/NgxFormErr';

export interface NgxFormErrConfig {
  /* How to display errors, only the first or list all errors */
  mode?: NgxFormErrViewMode;
  /* When to Show Validation Errors */
  showWhen?: (keyof typeof NgxFormErrViewLogic)[];
}

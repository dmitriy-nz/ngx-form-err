import {NgxFormErrConfig} from '../interfaces/NgxFormErrConfig';
import {NgxFormErrViewLogic, NgxFormErrViewMode} from '../types/NgxFormErr';

export const DefaultNgFormErrConfig: NgxFormErrConfig = {
  mode: NgxFormErrViewMode.single,
  showWhen: [NgxFormErrViewLogic.dirty, NgxFormErrViewLogic.formSubmitted]
};

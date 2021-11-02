export enum NgxFormErrViewMode {
  /* Show only first one validation error */
  single = 'single',
  /* Show all validations errors */
  all = 'all',
}

export enum NgxFormErrViewLogic {
  /* Show validation errors immediately */
  immediately = 'immediately',
  /* Show validation errors only when the input has lost focus */
  touched = 'touched',
  /* Show validation errors when changing the model */
  dirty = 'dirty',
  /* Show validation errors after form submission */
  formSubmitted = 'formSubmitted'
}

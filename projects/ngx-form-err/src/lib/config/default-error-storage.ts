import {ErrorGeneratorStorage} from '../types/ErrorGeneratorStorage';

export const DefaultErrorStorage: ErrorGeneratorStorage = {
  required: 'Required field',
  minlength: (data) => `Min length is ${data.requiredLength}`,
  maxlength: (data) => `Max length is ${data.requiredLength}`,
  pattern: `The value does not match the pattern`,
  max: (data) => `The value must be no more val ${data.max}`,
  min: (data) => `The value must be greater ${data.min}`
};

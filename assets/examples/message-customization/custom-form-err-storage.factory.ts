import {Injectable} from '@angular/core';
import {AbstractNgxFormErrStorageFactory, ErrorGeneratorStorage} from 'ngx-form-err';

@Injectable()
export class CustomFormErrStorageFactory implements AbstractNgxFormErrStorageFactory {

  getErrorStorage(): ErrorGeneratorStorage {
    // Your logic for receiving and returning error messages
    return {
      required: 'My custom required error message',
      minlength: 'My min length message',
      maxlength: (data) => `The maximum length should be no more than ${data.requiredLength}`
    };
  }

}

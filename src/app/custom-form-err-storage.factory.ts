import {Injectable} from '@angular/core';
import {AbstractNgxFormErrStorageFactory} from '../../projects/ngx-form-err/src/lib/classes/AbstractNgxFormErrStorageFactory';
import {ErrorGeneratorStorage} from '../../projects/ngx-form-err/src/lib/types/ErrorGeneratorStorage';

@Injectable()
export class CustomFormErrStorageFactory implements AbstractNgxFormErrStorageFactory {

  getErrorStorage(): ErrorGeneratorStorage {
    // Your logic for receiving and returning error messages
    return {
      required: 'My custom error message',
      minlength: 'My min length message',
      maxlength: (data) => `Max length is ${data.requiredLength}`
    };
  }

}

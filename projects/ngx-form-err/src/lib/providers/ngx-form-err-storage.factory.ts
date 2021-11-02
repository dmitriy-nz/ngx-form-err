import {Injectable} from '@angular/core';
import {AbstractNgxFormErrStorageFactory} from '../classes/AbstractNgxFormErrStorageFactory';
import {ErrorGeneratorStorage} from '../types/ErrorGeneratorStorage';
import {DefaultErrorStorage} from '../config/default-error-storage';

@Injectable()
export class NgxFormErrStorageFactory implements AbstractNgxFormErrStorageFactory {

  getErrorStorage(): ErrorGeneratorStorage {
    return DefaultErrorStorage;
  }

}

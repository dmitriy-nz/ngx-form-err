import {ErrorGeneratorStorage} from '../types/ErrorGeneratorStorage';

export abstract class AbstractNgxFormErrStorageFactory {
  abstract getErrorStorage(): ErrorGeneratorStorage;
}

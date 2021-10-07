import { isNumber } from 'lodash';
import { Service } from 'typedi';

import { SampleRepository } from './repository/sample.repository';
import { Sample } from './sample.model';

@Service()
export class SampleService {
  constructor(private readonly sampleRepository: SampleRepository) {}

  async findById(sampleId: number): Promise<Sample> {
    if (!this.isValid(sampleId)) {
      // Aunque haya que devolver error tiene que ser asíncrono porque por narices devuelves una promesa
      return Promise.reject(new Error('Invalid Sample ID'));
    }
    
    return await this.sampleRepository.findById(sampleId);
    // return Promise.resolve({id: 1, type: 'df'});
  }

  async getAll() : Promise<Sample[]>{
    return await this.sampleRepository.getAll();
  }

  // No es una operación de entrada/salida por lo que no es async, no bloquea nada
  private isValid(id: number): boolean {
    return id != null && isNumber(id) && id > 0;
  }
}

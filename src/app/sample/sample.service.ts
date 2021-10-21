import { isNumber, isString } from 'lodash';
import { Service } from 'typedi';

import { SampleRepository } from './sample.repository';
import { Sample } from './sample.model';

@Service()
export class SampleService {
  constructor(private readonly sampleRepository: SampleRepository) {}

  async findById(sampleId: number): Promise<Sample> {
    if (!this.isValidId(sampleId)) {
      // Aunque haya que devolver error tiene que ser asíncrono porque por narices devuelves una promesa
      return Promise.reject(new Error('Invalid Sample ID'));
    }
    return await this.sampleRepository.findById(sampleId);
  }

  async getAll() : Promise<Sample[]>{
    return await this.sampleRepository.getAll();
  }
  
  async create(sample: Sample) : Promise<Sample>{
    if(!this.isValidType(sample.type)){
      return Promise.reject(new Error('Invalid Sample Type'));
    }
    return await this.sampleRepository.post(sample.type);
  }

  async update(sampleId: number, sample: Sample) : Promise<Sample> {
    // Comprobar si la request es correcta
    if (!this.isValidId(sampleId) && !this.isValidType(sample.type)) {
      return Promise.reject(new Error('Invalid Sample ID'));
    }
    return await this.sampleRepository.update(sampleId, sample.type);
  }

  async delete(sampleId: number): Promise<Sample> {
    if (!this.isValidId(sampleId)) {
      return Promise.reject(new Error('Invalid Sample ID'));
    }
    return await this.sampleRepository.delete(sampleId);
  }

  // No es una operación de entrada/salida por lo que no es async, no bloquea nada
  private isValidId(id: number): boolean {
    return id != null && isNumber(id) && id > 0;
  }

  private isValidType(type: string): boolean {
    return type != null && isString(type) && type.length > 1;
  }

}

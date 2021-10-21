import { number } from "joi";
import { sample } from "lodash";
import { DatabaseService } from "../../database/src";
import { Service } from 'typedi';   // Este es el @Service
import { Sample } from './sample.model';

/* Todas las clases se declaran con @Service por inyección de dependencias.
 * Esto permite que no se tenga que instanciar con new SampleRepository, el sistema
 * se encarga de crear una instancia y devolvértela. EN TODAS las clases.
 * Con esto se el sistema sólo crea una instancia en todo el proyecto sin ocuparte
 * tú de eso.
*/
@Service()
export class SampleRepository {

  // En vez de dbService: DatabaseService = new DatabaseService(); se hace:
  constructor(private readonly dbService: DatabaseService){}

  async findById(sampleId:number):Promise<Sample>{
    const queryDoc:any = {
      sql: 'SELECT * FROM samples WHERE id=$1',
      params: [sampleId]
    };

    // Called sugar syntax porque es asíncrona pero no hace falta el callback, para eso se usa await y 
    // luego se puede recoger el resultado en una variable
    const samples = await this.dbService.execQuery(queryDoc);
    return samples.rows[0];
  }

  async getAll() : Promise<Sample[]>{
    const queryDoc: any = {
      sql: 'SELECT * FROM samples'
    };

    const samples = await this.dbService.execQuery(queryDoc);
    return samples.rows;
  }
  
  async post(sampleType:string) : Promise<Sample>{
    const queryDoc: any = {
      sql: 'INSERT INTO samples (type) VALUES($1)',
      params: [sampleType]
    };

    const samples = await this.dbService.execQuery(queryDoc);
    return samples.rows[0];
  }

  async update(sampleId:number, newType:string):Promise<Sample>{
    const queryDoc:any = {
      sql: 'UPDATE samples SET id=$1, type=$2 WHERE id=$1',
      params: [sampleId, newType]
    };

    const samples = await this.dbService.execQuery(queryDoc);
    return samples.rows[0];
  }

  async delete(sampleId:number):Promise<Sample>{
    const queryDoc:any = {
      sql: 'DELETE FROM samples WHERE id=$1 RETURNING *',
      params: [sampleId]
    };

    const samples = await this.dbService.execQuery(queryDoc);
    return samples.rows[0];
  }
}
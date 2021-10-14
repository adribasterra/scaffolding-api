import { StatusCodes } from 'http-status-codes';
import { Service } from 'typedi';
import { ErrorService } from './../../error/error';
import { Sample } from './sample.model';
import { SampleService } from './sample.service';

@Service()
export class SampleController {
  constructor(
    private readonly sampleService: SampleService,
    private readonly errorService: ErrorService
  ) {}

  // No devuelve nada porque todo se gestiona en la response.
  async get(req: any, res: any, next: any): Promise<void> {
    if (req.params.sampleId == null) {
      return next(
        this.errorService.sendError(res, StatusCodes.BAD_REQUEST)
      );
    }

    try {
      const sampleCode = parseInt(req.params.sampleId);
      const sample = await this.sampleService.findById(sampleCode);
      res.send(sample);
    } catch (err) {
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  }

  async getAll(req: any, res: any, next: any) : Promise<void> {
    try {
      const samples:Sample[] = await this.sampleService.getAll();
      res.send(samples);
    } catch (err) {
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  }
  
  async create(req: any, res: any, next: any) : Promise<void> {
    if (req.body.type == null) {
      this.errorService.sendError(res, StatusCodes.BAD_REQUEST)
    }
    try {
      const sample = await this.sampleService.create(req.body.type);
      res.send(sample);
    } catch (err) {
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  }

  async update(req: any, res: any, next: any): Promise<void> {
    if (req.params.sampleId == null) {
      return next(
        this.errorService.sendError(res, StatusCodes.BAD_REQUEST),
      );
    }

    try {
      const sampleCode = parseInt(req.params.sampleId);
      const sample = await this.sampleService.update(sampleCode, req.body.type);
      res.send(sample);
    } catch (err) {
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  }

  async delete(req: any, res: any, next: any): Promise<void> {
    if (req.params.sampleId == null) {
      return next(
        this.errorService.sendError(res, StatusCodes.BAD_REQUEST),
      );
    }

    try {
      const sampleCode = parseInt(req.params.sampleId);
      const sample = await this.sampleService.delete(sampleCode);
      res.send(sample);
    } catch (err) {
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  }
}

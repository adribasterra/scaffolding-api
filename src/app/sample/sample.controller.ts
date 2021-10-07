import { StatusCodes } from 'http-status-codes';
import { Service } from 'typedi';
import { ErrorService } from './../../error/error';
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
        this.errorService.sendError(res, StatusCodes.BAD_REQUEST),
      );
    }

    try {
      const sampleCode = parseInt(req.params.sampleId);
      const sample = await this.sampleService.findById(sampleCode);
      res.send(sample);
    } catch (err) {
      console.log(err);
      // res.send("not found the puta mierda");
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  }

  async getAll(req: any, res: any, next: any) : Promise<void> {
    try {
      const [] = await this.sampleService.getAll();
      res.send([]);
    } catch (err) {
      res.sendStatus(StatusCodes.NOT_FOUND);
    }

  }
}

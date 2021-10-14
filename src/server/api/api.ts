import { Router } from 'express';
import { SampleController } from './../../app/sample/sample.controller';
import { Service } from 'typedi';

@Service()
export class Api {
  private apiRouter: Router;

  constructor(private readonly sampleController: SampleController) {
    this.initRouterAndSetApiRoutes();
  }

  getApiRouter(): Router {
    return this.apiRouter;
  }

  private initRouterAndSetApiRoutes(): void {
    this.apiRouter = Router();
    this.setSampleControllerApiRoutes();
  }

  private setSampleControllerApiRoutes(): void {
    this.apiRouter.get('/samples/:sampleId', (req, res, next) =>
      this.sampleController.get(req, res, next)
    );
    this.apiRouter.get('/samples', (req, res, next) =>
      this.sampleController.getAll(req, res, next)
    );
    this.apiRouter.post('/samples', (req, res, next) =>
      this.sampleController.create(req, res, next)
    );
    this.apiRouter.patch('/samples/:sampleId', (req, res, next) =>
      this.sampleController.update(req, res, next)
    );
    this.apiRouter.delete('/samples/:sampleId', (req, res, next) =>
      this.sampleController.delete(req, res, next)
    );
  }
}

// Este fichero no va a resolver las peticiones, ese fichero será otro. Éste sólo hace las peticiones.
// Arquitectura por capas

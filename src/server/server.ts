import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import { Application } from 'express';
import express from 'express';
import * as http from 'http';
import morgan from 'morgan';
import { Service } from 'typedi';

import { config } from '../config/environment';
import { Api } from './api/api';

@Service()
export class Server {
  app: Application;
  httpServer: http.Server;

  constructor(
    private readonly api: Api,
  ) {
    this.app = express();
    this.setupServer();
  }

  private setupServer(): void {
    // Middlewares
    this.app.use(cors());                             // Seguridad
    this.app.use(json({ limit: '5mb' }));
    this.app.use(urlencoded({ extended: false }));    // Enviar formularios tipo post
    this.app.use(morgan('dev'));

    this.httpServer = this.app.listen(config.port, this.onHttpServerListening);

    // Publicando bajo esa URL todas las rutas que tengamos (en este caso /samples)
    this.app.use('/api', this.api.getApiRouter());
    
  }

  private onHttpServerListening(): void {
    console.log('Server Express iniciado en modo %s (ip: %s, puerto: %s)', config.env, config.ip, config.port);
  }
}

import express, { Application, Request, Response } from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes/routes';
import { checkJwt } from './middlewares/checkJwt';

//typeorm
createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'galeria',
  entities: [__dirname + '/models/*.ts'],
  synchronize: true,
})
  .then((connection) => {
    // here you can start to work with your entities
  })
  .catch((error) => console.log(error));

//express
const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

// je dois prendre se get vers le routes.ts plus tard
app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: 'Mugiwara',
  });
});
app.listen(4000, () => {
  console.log('running');
});

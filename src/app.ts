import express, { Application, Request, Response, urlencoded } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";

//typeorm
createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "galeria",
  entities: [__dirname + "/models/*.ts"],
  synchronize: true,
})
  .then((connection) => {
    // here you can start to work with your entities
  })
  .catch((error) => console.log(error));

//express
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "Mugiwara",
  });
});
app.listen(4000, () => {
  console.log("running");
});

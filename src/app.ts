import express, { Application, Request, Response, urlencoded } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import router from "./routes/routes";

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

//routes
app.use(router);

// je dois prendre se get vers le routes.ts plus tard
app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "Mugiwara",
  });
});
app.listen(4000, () => {
  console.log("running");
});

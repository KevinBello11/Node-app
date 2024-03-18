import express, { json } from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config() {
    // Settings
    this.app.set("port", process.env.PORT || 4333);
    // middlewares
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(json());
    this.app.use(cors());
  }

  public routes() {
    this.app.post("/api/post", (req, res) => {
      const numA = Number(req.body.numA);
      const numB = Number(req.body.numB);
      
      const suma = numA + numB;
      const resta = numA - numB;
      const multiplicacion = numA * numB;
      const division = numA / numB;

      res.json({
        suma: suma,
        resta: resta,
        multiplicacion: multiplicacion,
        division: division,
      });
    });

    this.app.get("/api/get", (req, res) => {
      res.send("GET request received");
    });
  }

  public start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server is listening on port", this.app.get("port"));
    });
  }
}

export { Server };

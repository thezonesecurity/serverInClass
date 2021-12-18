import express, { Express, urlencoded } from "express";
import dotenv from "dotenv";
import mongoose, { Mongoose } from "mongoose";

import UserModule from "./modules/userModules/init";

if (process.env.NODE_ENV == "development") {
  dotenv.config();
}

class App {
  private app: Express;
  private apiVercion: string;
  private port: number;
  private clientMongo: Mongoose;
  constructor() {
    this.app = express();
    this.apiVercion = process.env.API_VERSION || "API";
    this.port = Number(process.env.PORT) || 8000;
    this.clientMongo = mongoose;
    this.configure();
    this.configureDataBase();
    this.startModules();
  }
  private configure() {
    this.app.use(express.json());
    this.app.use(express.urlencoded());
  }
  private configureDataBase() {
    const dataBaseName = process.env.DB_NAME;
    const dataBaseHost = process.env.DB_HOST;
    const dataBasePort = process.env.DB_PORT;
    const dataBaseUser = process.env.DB_USER;
    const dataBasePassword = process.env.DB_PASSWORD;
    //para la conexion DB
    //mongodb://root:example@mongo:27017/
    const conectionString = `mongodb://${dataBaseUser}:${dataBasePassword}@${dataBaseHost}:${dataBasePort}`;
    this.clientMongo.connect(conectionString);
    this.clientMongo.connection.on("open", () => {
      console.log("success connect to database...");
    });
    this.clientMongo.connection.on("Error", (err) => {
      console.error("can not connect to database...");
      console.log(err);
    });
  }
  private startModules() {
    console.log("Load modules ...");
    new UserModule(`/${this.apiVercion}/user`, this);
  }
  public getApp(): Express {
    return this.app;
  }
  public getClientMongoose(): Mongoose {
    return this.clientMongo;
  }
  public getPort(): Number {
    return this.port;
  }
}
export default App;
/*
patron de diseño REPOSITORI k permite aplicar el el 2do principio (el sis queda abierto para 
extenderlo y cerrado xk ya funciona perfectamente ) y el 
ultimo principio (las clases de orden superior no dependan de las clases de 
orden inferior) de desarrollo solid

*/
//1:43:30

import App from "./App";
const application: App = new App();
application.getApp().listen(application.getPort(), () => {
  console.log(`Sever running in port ${application.getPort()}`);
});
/*
import express, { Express, Request, Response } from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.route("/").get((request: Request, response: Response) => {
  response.status(200).json({ serverResponse: "mi msm del server" });
});
const port = 8000;
app.listen(port, () => {
  console.log("server running in port " + port);
});

*/

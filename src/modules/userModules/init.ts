import App from "../../App";
import Routes from "./routes";
class UserModule {
  constructor(routePath: string, app: App) {
    console.log("load module of user...");
    const routes: Routes = new Routes(routePath, app);
  }
}
export default UserModule;
//0:43:20

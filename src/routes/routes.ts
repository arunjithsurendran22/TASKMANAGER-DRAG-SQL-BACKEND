import { Express, Router, Response } from "express";
import { authRouter, taskRouter } from "./v1/custom routes";

export const routes = (app: Express) => {
  const router = Router();

  // custom route goes here
  router.use("/api/v1/auth", authRouter(router));
  router.use("/api/v1/task", taskRouter(router));

  // default route
  router.get("/", (res: Response) => {
    res.send("This is the router home page");
  });

  app.use(router);
};

export default routes;

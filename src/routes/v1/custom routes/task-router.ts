import { Router } from "express";
import { taskController } from "../../../controllers";
import { verifyUser } from "../../../middlewares/auth/verify-user";

const taskRouter = (router: Router) => {
  router.post("/create-task", verifyUser, taskController.createTask);
  router.put("/update-task/:taskId", verifyUser, taskController.updateTask);
  router.get("/get-all-tasks", verifyUser, taskController.getAllTasks);
  router.delete("/delete-task/:taskId", verifyUser, taskController.deleteTask);
  router.put("/update-rank/:taskId", verifyUser, taskController.updateRank);

  

  return router;
};

export default taskRouter;

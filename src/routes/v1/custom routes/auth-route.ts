import { Router } from 'express';
import authController from '../../../controllers/auth-controller';
import { verifyUser } from '../../../middlewares/auth/verify-user';

const authRouter = (router: Router) => {

  router.route('/login').post(authController.authenticateUser);
  router.route('/logout').post(verifyUser, authController.logOutUser);
  router.route('/register').post(authController.registerUser);

  return router;
};

export default authRouter;

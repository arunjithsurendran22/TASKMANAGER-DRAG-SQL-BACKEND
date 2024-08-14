import { Router } from 'express';
import authController from '../../../controllers/auth-controller';
import { verifyUser } from '../../../middlewares/auth/verify-user';

const authRouter = (router: Router) => {
  router.route('/user-login').post(authController.authenticateUser);
  router.route('/log-out').post(verifyUser, authController.logOutUser);
  router.route('/refresh-tokens').post(authController.refreshTokens);
  return router;
};

export default authRouter;

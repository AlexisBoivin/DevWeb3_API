import { Router } from 'express';

import Paths from '../common/Paths';
import PnjRoutes from './PnjRoutes';

import UserRoutes from './UserRoutes';
import JetonRoutes from './JetonRoutes';


// **** Variables **** //

const apiRouter = Router();


// ** Add UserRouter ** //

// Init router
const userRouter = Router();

// Init router
const pnjRouter = Router();


// Get all users
userRouter.get(Paths.Users.GetOne, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);


pnjRouter.get(Paths.Pnj.GetId, PnjRoutes.getOne);
pnjRouter.get(Paths.Pnj.GetAll, PnjRoutes.getAll);
pnjRouter.get(Paths.Pnj.GetDefi, PnjRoutes.getDefi);
pnjRouter.get(Paths.Pnj.GetVivant, PnjRoutes.getVivant);

pnjRouter.post(Paths.Pnj.Add, PnjRoutes.add);
pnjRouter.put(Paths.Pnj.Update, PnjRoutes.update);
pnjRouter.delete(Paths.Pnj.Delete, PnjRoutes.delete);

// Add UserRouter
apiRouter.use(Paths.Pnj.Base, pnjRouter);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);

// ** Add JetonRouter ** //

// Init Router
const tokenRouter = Router();

// Generate token
tokenRouter.post(Paths.GenerateToken.Get, JetonRoutes.generateToken);

// Add JetonRouter
apiRouter.use(Paths.GenerateToken.Base, tokenRouter);
// **** Export default **** //

export default apiRouter;
import JetonService from '../services/jetonService';
import User, { isUser } from '../models/User';
import { IReq, IRes } from './common/types';
import check from './common/check';
// **** Functions **** //

/**
 * Générer un jeton.
 *
 * @param {IReq} req - La requête au serveur
 * @param {IRes} res - La réponse du serveur
 */
async function generateToken(req: IReq, res: IRes) {
  const userLogin = check.isValid(req.body, 'userlogin', isUser);

  if (!userLogin) {
    return res.status(400).send({ error: 'Utilisateur non valide' });
  }
  
  const token = await JetonService.generateToken(userLogin);
  return res.send({ token: token });
}

// **** Export default **** //

export default {
  generateToken,
} as const;
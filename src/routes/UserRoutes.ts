import HttpStatusCodes from '@src/common/HttpStatusCodes';
import UserService from '@src/services/UserService';
import User, { isUser } from '@src/models/User';
import { USER_NOT_FOUND_ERR } from '@src/services/UserService';
import { IReq, IRes } from './common/types';
import check from './common/check';
import { error } from 'console';

// **** Functions **** //

/**
 * Get all pnj.
 */
async function getAll(_: IReq, res: IRes){
  const users = await UserService.getAll();
  return res.status(HttpStatusCodes.OK).json({ users });
}

/**
 * Get by id.
 */
async function getOne(req: IReq, res:IRes) {
  const username = check.isStr(req.params, 'username');
  const user = await UserService.getOne(username);
  return res.status(HttpStatusCodes.OK).json({user});
}

/**
 * ajoute un utilisateur
 */
async function add(req: IReq, res: IRes) {
    const user = check.isValid(req.body, 'user', isUser);
      
    if (!user) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: 'L\'utilisateur ne correspond pas aux critères des users' });
    }

  await UserService.add(user);
  return res.status(HttpStatusCodes.CREATED).end();
}


/**
 * Met à jour les information de l'un des personnages non-joueurs.
 */
async function update(req: IReq, res: IRes) {
  const user = check.isValid(req.body, 'user', isUser);
  const id = check.isStr(req.params, 'id')
  if(!id){
    return res.status(HttpStatusCodes.BAD_REQUEST).json({error: USER_NOT_FOUND_ERR});
  }
  await UserService.update(user, id);
  return res.status(HttpStatusCodes.OK).json({ user });
}

/**
 * Supprime un personnage non-joueurs à partir de son identifiant.
 */
async function delete_(req: IReq, res: IRes) {
    const _id = check.isStr(req.params, 'id');
    if(!_id){
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ erreur: 'Il y a une erreur avec l\'identifiant unique.' });
    }
    await UserService.delete(_id);
    return res.status(HttpStatusCodes.OK).end("La supression a fonctionné.");
}
// **** Export default **** //

export default {
  getAll,
  getOne,
  add,
  update,
  delete: delete_,
} as const;

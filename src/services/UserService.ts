import userRepo from '../repos/UserRepo';
import User, { IUser } from '@src/models/User';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { IReq } from '@src/routes/common/types';;




// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'L\'utilisateur n\'a pas été trouvé.';


// **** Functions **** //

/**
 * Get tous les personnages.
 */
function getAll(): Promise<IUser[]> {
  return userRepo.getAll();
}
/**
 * Get un personnage selon son id.
 * @param id L'identifiant unique du personnage non-joueur.
 * @returns renvoie un tableau d'IUser.
 */
function getOne(username: string): Promise<IUser | null> {
  return userRepo.getOne(username);
}


/**
 * Ajoute un utilisateur.
*/
function add(user: IUser): Promise<IUser> {
  return userRepo.add(user);
}

/**
 * Modifie un utilisateur.
 * @param user: les nouvelles valeurs d'un utilisateur.
 * @returns Renvoie l'utilisateur
 */
async function update(user: IUser, id:string): Promise<IUser> {
  const persists = await userRepo.persists(id);
  if (!persists) {
    throw new Error(HttpStatusCodes.NOT_FOUND + USER_NOT_FOUND_ERR);
  }
  
  return userRepo.update(user, id);
}

/**
 * Supprime un personnage non-joueur en se basant sur son identifiant.
 * @param id L'identifiant unique du personnage non-joueur
 * @returns void
 */
async function _delete(id: string): Promise<void> {
 try{
  return userRepo.delete(id);
 } 
 catch(erreur){
  throw Error("Au problème est survenue avec la supression de l'utilisateur");
 }
}


// **** Export default **** //

export default {
  getAll,
  getOne,
  add,
  update,
  delete: _delete,
} as const;

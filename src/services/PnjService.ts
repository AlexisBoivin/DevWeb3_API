import pnjRepo from '@src/repos/PnjRepo';
import Pnj, { IPnj } from '@src/models/Pnj';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { IReq } from '@src/routes/common/types';;




// **** Variables **** //

export const PNJ_NOT_FOUND_ERR = 'Le personnage n\'a pas été trouvé.';


// **** Functions **** //

/**
 * Get tous les personnages.
 */
function getAll(): Promise<IPnj[] | null> {
  return pnjRepo.getAll();
}
/**
 * Get un personnage selon son id.
 * @param id L'identifiant unique du personnage non-joueur.
 * @returns renvoie un tableau d'IPnj.
 */
function getOne(id: string): Promise<IPnj | null> {
  return pnjRepo.getOne(id);
}

/**
 * Get les personnages qui sont d'un niveau de défi
 * @param min Le niveau de défi minimal
 * @returns un tableau de IPnj
 */
function getDefi(min: Number): Promise<IPnj[] | null> {
  return pnjRepo.getDefi(min);
}

/**
 * Get les personnages non-joueurs s'ils sont vivant ou non.
 * @param vivant un string qui est égale à "oui" ou "non"
 * @returns Renvoie un tableau de IPnj
 */
function getVivant(vivant: string): Promise<IPnj[] | null> {
  return pnjRepo.getVivant(vivant);
}
/**
 * Ajoute un personnage non-joueur.
*/
function add(pnj: IPnj): Promise<IPnj> {
  return pnjRepo.add(pnj);
}

/**
 * Modifie un personnage non-joueur.
 * @param pnj: les nouvelles valeurs d'un personnage non-joueur.
 * @returns Renvoie le pnj
 */
async function update(pnj: IPnj, id:string): Promise<IPnj> {
  const persists = await pnjRepo.persists(id);
  if (!persists) {
    throw new Error(HttpStatusCodes.NOT_FOUND + PNJ_NOT_FOUND_ERR);
  }
  
  return pnjRepo.update(pnj, id);
}

/**
 * Supprime un personnage non-joueur en se basant sur son identifiant.
 * @param id L'identifiant unique du personnage non-joueur
 * @returns void
 */
async function _delete(id: string): Promise<void> {
 try{
  return pnjRepo.delete(id);
 } 
 catch(erreur){
  throw Error("Au problème est survenue avec la supression du personnage.");
 }
}


// **** Export default **** //

export default {
  getAll,
  getOne,
  getDefi,
  getVivant,
  add,
  update,
  delete: _delete,
} as const;

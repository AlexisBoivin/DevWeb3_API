import HttpStatusCodes from '@src/common/HttpStatusCodes';
import PnjService from '@src/services/PnjService';
import Pnj, { isPnj } from '@src/models/Pnj';
import { PNJ_NOT_FOUND_ERR } from '@src/services/PnjService';
import { IReq, IRes } from './common/types';
import check from './common/check';
import { error } from 'console';

// **** Functions **** //

/**
 * Get all pnj.
 */
async function getAll(_: IReq, res: IRes){
  const pnjs = await PnjService.getAll();
  return res.status(HttpStatusCodes.OK).json({ pnjs });
}

/**
 * Get by id.
 */
async function getOne(req: IReq, res:IRes) {
  const id = check.isStr(req.params, 'id');
  const pnj = await PnjService.getOne(id);
  return res.status(HttpStatusCodes.OK).json({pnj});
}

/**
 * Get tous les personnages non-joueurs qui ont un niveau de défi supérieur au minimum reçu en paramètres.
 */

async function getDefi(req: IReq, res: IRes) {
  const min = Number(req.params.niveauDefi);
  const pnjs = await PnjService.getDefi(min);
  return res.status(HttpStatusCodes.OK).json({pnjs});
}


/**
 * Get tous les personnages non-joueurs qui sont considéré vivant dans la base de donnée.
 */
async function getVivant(req: IReq, res: IRes) {
  const vivant = check.isStr(req.params, 'ouiounon');
  if(vivant == "oui" || vivant == "non")
  {
    const pnjs = await PnjService.getVivant(vivant);
    return res.status(HttpStatusCodes.OK).json({pnjs});
  }
  else
  {
    throw new Error(HttpStatusCodes.BAD_REQUEST + " Les paramètres acceptés pour cette requête sont \"oui\" ou \"non\".")
  }
}

/**
 * Ajoute un personnage non-joueurs à la base de données.
 */
async function add(req: IReq, res: IRes) {
    const pnj = check.isValid(req.body, 'pnj', isPnj);
      
    if (!pnj) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: 'Le pnj ne correspond pas aux critères des pnjs' });
    }

  await PnjService.add(pnj);
  return res.status(HttpStatusCodes.CREATED).end();
}


/**
 * Met à jour les information de l'un des personnages non-joueurs.
 */
async function update(req: IReq, res: IRes) {
  const pnj = check.isValid(req.body, 'pnj', isPnj);
  const id = check.isStr(req.params, 'id')
  if(!id){
    return res.status(HttpStatusCodes.BAD_REQUEST).json({error: PNJ_NOT_FOUND_ERR});
  }
  await PnjService.update(pnj, id);
  return res.status(HttpStatusCodes.OK).json({ pnj });
}

/**
 * Supprime un personnage non-joueurs à partir de son identifiant.
 */
async function delete_(req: IReq, res: IRes) {
    const _id = check.isStr(req.params, 'id');
    if(!_id){
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ erreur: 'Il y a une erreur avec l\'identifiant unique.' });
    }
    await PnjService.delete(_id);
    return res.status(HttpStatusCodes.OK).end("La supression a fonctionné.");
}
// **** Export default **** //

export default {
  getAll,
  getOne,
  getDefi,
  getVivant,
  add,
  update,
  delete: delete_,
} as const;

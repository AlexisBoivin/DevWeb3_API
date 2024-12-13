import EnvVars from '@src/common/EnvVars';
import Pnj, {IPnj } from '@src/models/Pnj';
import mongoose, { mongo } from 'mongoose';
const uri = EnvVars.MongoDb_URI;

// **** Functions **** //


/**
 * Get all jeux.
 */
async function getAll(): Promise<IPnj[]> {
  const pnjs = await Pnj.find();
  return pnjs;
}


async function getOne(id: string): Promise<IPnj | null> {
  const pnj = await Pnj.findById(id);
  return pnj;
}


async function getDefi(min:Number): Promise<IPnj[] | null> {
  const pnj = await Pnj.find({niveauDefi:{$gte:min}});
  return pnj;
}

async function getVivant(vivant: string): Promise<IPnj[] | null> {
  let enVie = true;
  if(vivant == "non")
  {
    enVie = false;
  }
  const pnj = await Pnj.find({vivant:enVie})
  return pnj;
}

/**
 * Add one user.
*/
async function add(pnj: IPnj): Promise<IPnj> {
  const nouveauPnj= new Pnj(pnj);
  await nouveauPnj.save();
  return nouveauPnj;
}


async function persists(id: string): Promise<boolean> {
  const pnj = await Pnj.findById(id);
  return pnj !== null;
}



async function update(pnj: IPnj, id: string): Promise<IPnj> {
  const pnjToUpdate = await Pnj.findById(id);
  if (pnjToUpdate === null) {
    throw new Error('Personnage non trouvé');
  }


  pnjToUpdate.nom.prenom = pnj.nom.prenom
  pnjToUpdate.nom.nomfamille = pnj.nom.nomfamille
  pnjToUpdate.dateAjout = pnj.dateAjout;
  pnjToUpdate.niveauDefi = pnj.niveauDefi;
  pnjToUpdate.vivant = pnj.vivant;
  pnjToUpdate.pointVie = pnj.pointVie;
  pnjToUpdate.pouvoirs = pnj.pouvoirs;
  pnjToUpdate.resume = pnj.resume;
  await pnjToUpdate.save();

  return pnjToUpdate;
}


async function delete_(id: string): Promise<void> {
  try {
    await Pnj.findByIdAndDelete(id);
  }
  catch(erreur){
    throw Error("Il y a un problème avec la base de donnée.")
  }
  
}


// **** Export default **** //

export default {
  getAll,
  getOne,
  getDefi,
  getVivant,
  add,
  persists,
  update,
  delete: delete_,
} as const;

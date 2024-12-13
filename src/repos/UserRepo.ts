import EnvVars from '@src/common/EnvVars';
import User, {IUser } from '@src/models/User';
import mongoose, { mongo } from 'mongoose';
const uri = EnvVars.MongoDb_URI;

// **** Functions **** //


/**
 * Get all jeux.
 */
async function getAll(): Promise<IUser[]> {
  const users = await User.find();
  return users;
}


async function getOne(username: string): Promise<IUser | null> {
  const user = await User.findById(username);
  return user;
}

/**
 * Add one user.
*/
async function add(user: IUser): Promise<IUser> {
  const nouveauUser= new User(user);
  await nouveauUser.save();
  return nouveauUser;
}


async function persists(id: string): Promise<boolean> {
  const user = await User.findById(id);
  return user !== null;
}



async function update(user: IUser, id: string): Promise<IUser> {
  const userToUpdate = await User.findById(id);
  if (userToUpdate === null) {
    throw new Error('Utilisateur non trouvé');
  }


  userToUpdate.username = user.username;
  userToUpdate.motdepasse = user.motdepasse;
  userToUpdate.email = user.email;
  await userToUpdate.save();

  return userToUpdate;
}


async function delete_(id: string): Promise<void> {
  try {
    await User.findByIdAndDelete(id);
  }
  catch(erreur){
    throw Error("Il y a un problème avec la base de donnée.")
  }
  
}


// **** Export default **** //

export default {
  getAll,
  getOne,
  add,
  persists,
  update,
  delete: delete_,
} as const;

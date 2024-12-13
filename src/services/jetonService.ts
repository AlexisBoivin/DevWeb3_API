// **** Variables **** //

import { IUser } from '@src/models/User';
import UserService from './UserService';
import jwt from 'jsonwebtoken';

export const UTILISATEUR_NOT_FOUND_ERR = 'Utilisateur non trouvé';

// **** Functions **** //

/**
 * Générer un jeton pour un utilisateur
 *
 * @param {IUserLogin} utilisateur - L'utilisateur demandant le jeton
 * @returns {Promise} - Le jeton signé
 */
async function generateToken(utilisateur: IUser): Promise<string> {
  const utilisateurBD = (await UserService.getAll()).filter(
    (user) => user.email === utilisateur.email
  )[0];
  if (utilisateurBD && utilisateurBD.motdepasse === utilisateur.motdepasse) {
    return jwt.sign(utilisateur.email, process.env.JWT_SECRET as string);
  } else {
    return '';
  }
}

// **** Export default **** //
export default {
  generateToken,
} as const;
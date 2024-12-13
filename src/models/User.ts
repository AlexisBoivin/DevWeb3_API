import mongoose, { Schema, model } from 'mongoose';
import moment from 'moment';


// **** Types **** //


export interface IUser {
  username: string;
  motdepasse: string;
  email: string;
}


// **** Schema **** //
const UserSchema = new Schema<IUser>({
    username:{ type:String, required: [true, "Le nom d'utilisateur est obligatoire."]},
    motdepasse:{
        type:String,
        required: [true, "L'utilisateur doit avoir un mot de passe."],
    },
    email:{type:String, required: [true, "Le email est obligatoire."]}
});



/**
 * See if the param meets criteria to be a user.
 */
 export function isUser(arg: unknown): arg is IUser {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'username' in arg && typeof arg.username === 'string' && arg.username !== null &&
    'motdepasse' in arg && typeof arg.motdepasse === 'string' && arg.motdepasse !== null &&
    'email' in arg && typeof arg.email === 'string' && arg.email !== null
  );
}




// **** Export **** //
 mongoose.pluralize(null);
 export default model<IUser>('user', UserSchema)
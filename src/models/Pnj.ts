import mongoose, { Schema, model } from 'mongoose';
import moment from 'moment';


// **** Types **** //


export interface IPnj {
  nom: {
    prenom:string;
    nomfamille:string;
  }
  dateAjout: Date;
  niveauDefi: number;
  vivant:boolean;
  pointVie: number;
  pouvoirs: [{
    nom: string;
    cout: string;
    description: string;
  }];
  resume: string;
  _id?: string;
}


// **** Schema **** //
const PnjSchema = new Schema<IPnj>({
  
  nom:{
    prenom:{ type:String, required: [true, "Le prénom est obligatoire."]},
    nomfamille:{ type:String}
  },
  dateAjout: {
    type: Date,
    required: [true, "La date d'ajout' est obligatoire"],
    default:Date.now()
  },
  niveauDefi: {
    type: Number,
    min:[0, "Le niveau de défi ne peut pas être négatif."]
  },
  vivant: { 
    type: Boolean,
    default: true
  },
  pointVie: {
    type:Number,
    min:[0, "Le nombre de points de vie ne peut pas être négatif."]
  },
  pouvoirs: [{
    nom: { type:String, required: [true, "Le nom du pouvoir est obligatoire."]},
    cout: { type:String, required: [true, "Le coût en action est obligatoire."]},
    description: { type:String, required: [true, "La description du pouvoir est obligatoire."]}
  }],
  resume:{
    type:String,
    required: [true, "Le résumer du personnage est obligatoire"],
  }
});



/**
 * See if the param meets criteria to be a user.
 */
 export function isPnj(arg: unknown): arg is IPnj {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'dateAjout' in arg && moment(arg.dateAjout as string | Date).isValid() && 
    'nom' in arg && typeof arg.nom === 'object' && arg.nom !== null &&
    'prenom' in arg.nom && typeof arg.nom.prenom === 'string' && 
    'niveauDefi' in arg && typeof arg.niveauDefi === 'number' &&
    'vivant' in arg && typeof arg.vivant === 'boolean' &&
    'pointVie' in arg && typeof arg.pointVie == 'number'
  );
}




// **** Export **** //
mongoose.pluralize(null);
export default model<IPnj>('pnj', PnjSchema)


/**
 * Express router paths go here.
 */


export default {
  Base: '/',
  GenerateToken: {
    Base: '/generatetoken',
    Get: '/',
  },
  Pnj: {
    Base: '/pnj',
    GetId: '/:id',
    GetAll:'/',
    GetVivant:'/vivant/:ouiounon', //Reçoit en paramètre vivant=oui ou vivant=non
    GetDefi: '/defi/:niveauDefi', //Retourne les pnj avec un niveau de défi supérieur ou égale à niveauDefi
    Add: '/',
    Update: '/:id',
    Delete: '/:id',
  },
  Users: {
    Base: '/user',
    GetOne: '/:id',
    GetAll:'/',
    Add: '/',
    Update: '/:id',
    Delete: '/:id',
  },
} as const;
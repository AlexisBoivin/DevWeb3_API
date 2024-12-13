import supertest, { Test } from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { defaultErrMsg as ValidatorErr } from 'jet-validator';
import insertUrlParams from 'inserturlparams';

import app from '@src/server';

import PnjRepo from '@src/repos/PnjRepo';
import Pnj, { IPnj } from '@src/models/Pnj';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { PNJ_NOT_FOUND_ERR } from '@src/services/PnjService';

import Paths from 'spec/support/Paths';
import apiCb from 'spec/support/apiCb'; // Fonction de rappel pour les tests API, utilisé comme patch pour les dates
import { TApiCb } from 'spec/types/misc';

// Réservations bidon pour la requête GET
const genererPnjsBidon = (): IPnj[] => {
  return [
    {
      "nom": {
        "prenom": "John",
        "nomfamille": "Doe"
      },
      "dateAjout": new Date("2023-10-02T00:00:00.000Z"),
      "niveauDefi": 888,
      "vivant": true,
      "pointVie": 100,
      "pouvoirs": [
        {
          "nom": "Invisibilité",
          "cout": "action",
          "description": "evient invisible pendant une minute."
        }
      ],
      "resume": "Un personnage discret.",
      "_id": "12345"
    },
    {
      "nom": {
        "prenom": "Pedro",
        "nomfamille": "Pascal"
      },
      "dateAjout": new Date("2023-10-02T00:00:00.000Z"),
      "niveauDefi": 2,
      "vivant": true,
      "pointVie": 100,
      "pouvoirs": [
        {
          "nom": "Glace",
          "cout": "action",
          "description": "Crée de la glace."
        }
      ],
      "resume": "Il peut te ramener chaud ou il peut te ramener froid.",
      "_id": "54321"
    },
  ];
};

// Tests
describe('PnjRouter', () => {
  let agent: TestAgent<Test>;

  // Doit rouler avant tous les tests
  beforeAll((done) => {
    agent = supertest.agent(app);
    done();
  });

  // Récupérer toutes les réservations
  describe(`"GET:${Paths.Pnj.GetAll}"`, () => {
    // Configuration de l'API
    const api = (cb: TApiCb) =>
      agent.get(Paths.Pnj.GetAll).end(apiCb(cb));

    // Succès
    it(
      'doit retourner un objet JSON avec toutes les réservations et un code de statut ' +
        `de "${HttpStatusCodes.OK}" si la requête est réussie.`,
      (done) => {
        // SpyOn est utilisé pour simuler la récupération des données, dans ce cas,
        // les réservations bidon sont retournées lorsque notre route appelle getAll.
        const data = genererPnjsBidon();
        spyOn(PnjRepo, 'getAll').and.resolveTo(data);
        // Appel de l'API
        api((res) => {
          expect(res.status).toBe(HttpStatusCodes.OK);
          expect(res.body).toEqual({ Pnjs: data });
          done();
        });
      }
    );
  });

  // Test d'ajout d'un personnage non-joueur
  describe(`"POST:${Paths.Pnj.Add}"`, () => {
    const ERROR_MSG = `${ValidatorErr}"Pnj".`,
      Pnj_BIDON = genererPnjsBidon()[0];

    // Préparation de l'API
    const callApi = (Pnj: IPnj | null, cb: TApiCb) =>
      agent.post('/api/pnj/').send({ Pnj }).end(apiCb(cb));

    // Test de succès de l'ajout d'un personnage
    it(
      `doit retourner un code de statut "${HttpStatusCodes.CREATED}" si la ` +
        'requête est réussie.',
      (done) => {
        // SpyOn est utilisé pour simuler la récupération des données, dans ce cas,
        // la fonction add ne retourne rien.
        spyOn(PnjRepo, 'add').and.resolveTo();
        // Appel de l'API
        callApi(Pnj_BIDON, (res) => {
          expect(res.status).toBe(HttpStatusCodes.CREATED);
          done();
        });
      }
    );

    // Paramètre manquant
    it(
      `doit retourner un objet JSON avec un message d'erreur "${ERROR_MSG}" ` +
        `et un code de statut "${HttpStatusCodes.BAD_REQUEST}" si le paramètre ` +
        'réservation est manquant.',
      (done) => {
        // Appel de l'API sans paramètre
        callApi(null, (res) => {
          expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
          expect(res.body.error).toBe(ERROR_MSG);
          done();
        });
      }
    );
  });

  // Mise à jour d'un personnage non-joueur
  describe(`"PUT:${Paths.Pnj.Update}"`, () => {
    const ERROR_MSG = `${ValidatorErr}"Pnj".`,
      Pnj_BIDON = genererPnjsBidon()[0];

    // Préparation de l'API
    const callApi = (Pnj: IPnj | null, cb: TApiCb) =>
      agent.put(Paths.Pnj.Update).send({ Pnj }).end(apiCb(cb));

    // Succès
    it(
      `doit retourner un code de statut "${HttpStatusCodes.OK}" si la ` +
        'requête est réussie.',
      (done) => {
        // SpyOn est utilisé pour simuler la récupération des données, dans ce cas,
        // la fonction update ne retourne rien mais la fonction persists retourne true.
        spyOn(PnjRepo, 'update').and.resolveTo();
        spyOn(PnjRepo, 'persists').and.resolveTo(true);
        // Appel de l'API
        callApi(Pnj_BIDON, (res) => {
          expect(res.status).toBe(HttpStatusCodes.OK);
          done();
        });
      }
    );

    // Paramètre manquant
    it(
      `doit retourner un objet JSON avec un message d'erreur "${ERROR_MSG}" ` +
        `et un code de statut "${HttpStatusCodes.BAD_REQUEST}" si le paramètre ` +
        'réservation est manquant.',
      (done) => {
        // Appel de l'API sans paramètre
        callApi(null, (res) => {
          expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
          expect(res.body.error).toBe(ERROR_MSG);
          done();
        });
      }
    );

    // Réservation non trouvée
    it(
      'doit retourner un objet JSON avec le message d\'erreur "' +
        `${PNJ_NOT_FOUND_ERR}" et un code de statut ` +
        `"${HttpStatusCodes.NOT_FOUND}" si l'identifiant n'a pas été trouvé.`,
      (done) => {
        // Appel de l'API
        callApi(Pnj_BIDON, (res) => {
          expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
          expect(res.body.error).toBe(PNJ_NOT_FOUND_ERR);
          done();
        });
      }
    );
  });

  // Supprimer un personnage non-joueur
  describe(`"DELETE:${Paths.Pnj.Delete}"`, () => {
    // Appel de l'API
    const callApi = (id: string, cb: TApiCb) =>
      agent
        .delete(insertUrlParams(Paths.Pnj.Delete, { id }))
        .end(apiCb(cb));

    // Succès
    it(
      `doit retourner un code de statut "${HttpStatusCodes.OK}" si la ` +
        'requête est réussie.',
      (done) => {
        // Configuration des spies
        spyOn(PnjRepo, 'delete').and.resolveTo();
        spyOn(PnjRepo, 'persists').and.resolveTo(true);
        // Appel de l'API
        callApi("12345", (res) => {
          expect(res.status).toBe(HttpStatusCodes.OK);
          done();
        });
      }
    );

    // Réservation non trouvée
    it(
      'doit retourner un objet JSON avec le message d\'erreur "' +
        `${PNJ_NOT_FOUND_ERR}" et un code de statut ` +
        `"${HttpStatusCodes.NOT_FOUND}" si l'identifiant n'a pas été trouvé.`,
      (done) => {
        // Configuration des spies
        callApi("allon", (res) => {
          expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
          expect(res.body.error).toBe(PNJ_NOT_FOUND_ERR);
          done();
        });
      }
    );
  });
});
## About

This project was created with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).


## Available Scripts

### `npm run dev`

Run the server in development mode.

### `npm test`

Run all unit-tests with hot-reloading.

### `npm test -- --testFile="name of test file" (i.e. --testFile=Users).`

Run a single unit-test.

### `npm run test:no-reloading`

Run all unit-tests without hot-reloading.

### `npm run lint`

Check for linting errors.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).

### `npm start -- --env="name of env file" (default is production).`

Run production build with a different env file.


## Additional Notes

- If `npm run dev` gives you issues with bcrypt on MacOS you may need to run: `npm rebuild bcrypt --build-from-source`. 









Procédure d’installation de l’API sur un poste local


git clone https://github.com/AlexisBoivin/DevWeb3_API.git

npm install





Procédure de création de la base de données.
    Le script pnj.pnj.json dans le dossier dev est au format json. L'application utilise une base de données MongoDB (MongoDBCompass ou MongoDBAtlas). Il faut importer les données au format json dans une collection "pnj".

URL de l’API publiée
    https://devweb3-api.onrender.com
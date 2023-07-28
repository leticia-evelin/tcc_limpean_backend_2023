/**
 *  Se for programar em js é recomentado usar o :
 *  npx eslint --init para javascript, ele ajuda a manter o código limpo.
 * 
 *  npm init
 *
 *  npm add express
 *
 *  npm add -D  typescript @types/express ts-node-dev
 *
 *  tsc --init
 *
 *  npm run dev
 *
 *  "scripts": {
 *  "dev": "ts-node-dev --transpile-only src/index.ts"
 *  },
 * 
 *  Para converte em js: npm i tsup -D 
 *  Configura o package.json
 *  Para inicializar npm run build
 * 
 *  Para rodar node ./dist/app.js
 */

import express from 'express'
import {server} from './server/server'

const app = express();
// Middleware para configurar o CORS
app.use((req, res, next) => {
    // Definindo as origens permitidas
    const allowedOrigins = ['http://localhost:8080'];
    const origin = req.headers.origin;
  
    if ( typeof origin == 'string' && allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  
    // Permitindo apenas os métodos GET, POST, PUT e DELETE
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  
    // Permitindo os cabeçalhos "Content-Type" e "Authorization"
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    // Continua para a próxima middleware
    next();
  });
  

app.use(server)

app.listen(8080, () => console.log('Servidor Aguardando requisições na porta 8080'))
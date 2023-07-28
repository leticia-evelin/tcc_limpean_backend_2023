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
 *  npm add cors
 * 
 *  npm add -D @types/cors
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

import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { server } from './server/server'

const app = express();
// Middleware para configurar o CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  // Permissões de origem de requisições
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Permissões de métodos que serão utilizados na API
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  // Define as permissões para o CORS
  app.use(cors())

  //Para continuar a leitura
  next()

});


app.use(server)

app.listen(8080, () => console.log('Servidor Aguardando requisições na porta 8080'))
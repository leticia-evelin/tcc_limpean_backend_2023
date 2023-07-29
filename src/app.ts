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
const allowedOrigin = 'https://api-rest-typescript-form2023.onrender.com'

//Configuração do cors
const corsOptions = {
  origin: allowedOrigin,
  methods: 'GET, POST, PUT, DELETE, OPTION'
}

app.use(cors(corsOptions))
  
app.use(server)

app.listen(8080, () => console.log('Servidor Aguardando requisições na porta 8080'))
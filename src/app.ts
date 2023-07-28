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
  const allowedOrigin = ['http://api-rest-typescript-form2023.onrender.com'];

  // Verifica se a origem da requisição é igual à URL permitida
  if (allowedOrigin.includes(req.headers.origin || '')) {
    // Permite a origem especificada
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  } else {
    // Recusa a origem não permitida
    return res.status(403).json({ error: 'Acesso negado.' });
  }

});


app.use(server)

app.listen(8080, () => console.log('Servidor Aguardando requisições na porta 8080'))
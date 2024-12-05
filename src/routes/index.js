import express from 'express';
import auth from '../routes/Auth.routes.js';
import todos from '../routes/Todos.routes.js';
import adm from '../routes/Adm.routes.js';



const routes = express.Router();

routes.use('/api', auth, todos);
routes.use('/api/adm', adm);

export default routes;
import { Router } from 'express';
import {create, getAll, getTodoByID} from '../controllers/TodoController.js';
import authorization from '../middlewares/Auth.middleware.js';

const router = Router();

export default router
    .use(authorization)
    .post('/todos', create)
    .get('/todos', getAll)
    .get('/todos/:id', getTodoByID)




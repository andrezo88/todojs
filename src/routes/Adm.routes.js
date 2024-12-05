import { Router } from 'express';
import authorization from '../middlewares/Auth.middleware.js';
import {getAllUserss, getAll, getUserByIdd, updateRole} from '../controllers/AdmController.js';
import verifyRoles from '../middlewares/VerifyRoles.middleware.js';
import ROLE_LIST from '../utils/ROLE_LIST.js';

const router = Router();

export default router
    .use(authorization, verifyRoles(ROLE_LIST.ADMIN))
    .get('/users', getAllUserss)
    .get('/todos', getAll)
    .get('/users/:id', getUserByIdd)
    .put('/user/role/:id', updateRole)
import { Router } from 'express';
import {createUser, loginUser} from '../controllers/UserController.js';

const router = Router();

export default router
    .post('/signup', createUser)
    .post('/login', loginUser)
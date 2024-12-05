import {create, login, findUsers, findByIdUser} from '../services/UserService.js';
import logger from "../configs/logger.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password)
            throw new Error('Todos os campos são obrigatórios!');
        
        const user = await create( name, email, password );
        res.status(201).json(user);
    } catch (error) {
        logger.info(`Erro no sistema: ${error.message}`);
        res.status(400).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            throw new Error('Todos os campos são obrigatórios!')
        }

        const logged = await login( email, password );
        res.status(200).json(logged);
    } catch (error) {
        logger.info(`Erro no sistema: ${error.message}`);
        res.status(400).json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await findUsers();
        res.status(200).json(allUsers);
    } catch (error) {
        logger.info(`Erro no sistema: ${error.message}`);
        res.status(500).json({ error: error.message });
    };
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        
        if(!id) throw new Error('O campo id é obrigatório!')
        
        const userFromDb = await findByIdUser(id);
        res.status(200).json(userFromDb);
    } catch (error) {
        logger.info(`Erro no sistema: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};
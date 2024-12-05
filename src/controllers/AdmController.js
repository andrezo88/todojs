import { updateRoleUser, getUserById, getAllTodos, getAllUsers } from "../services/AdmService.js";
import loggers from "../configs/logger.js";

    export const updateRole = async (req, res) => {
        const { id } = req.params
        const { role } = req.body

        
        try {
            if (!role || !id) {
                throw new Error ("Os campos são obrigatórios.")
            }

            if (!req.headers.authorization) {
                throw new Error("Não autorizado")
            }
            
            const roleChanged = await updateRoleUser({ id, role })
            res.status(200).json(roleChanged);
        } catch (error) {
            loggers.info(`Erro no sistema: ${error.message}`);
            res.status(400).json({ message: error.message });
        }
    }


    export const getUserByIdd = async (req, res) => {
        const { id } = req.params;
        try {

            if (!id) {
                throw new Error ("Os campos são obrigatórios.")
            }

            if(!req.headers.authorization) {
                throw new Error("Não autorizado")
            }

            const user = await getUserById(id)
            res.status(200).json(user)
        } catch (error) {
            loggers.info(`Erro no sistema: ${error.message}`);
            res.status(404).json({ message: error.message });        }
    }

    export const getAllUserss = async (req, res) => {
        try {

            if(!req.headers.authorization) {
                throw new Error("Não autorizado")
            }

            const allUsers = await allUsers()
            res.status(200).json(allUsers)
        } catch (error) {
            loggers.info(`Erro no sistema: ${error.message}`);
            res.status(400).json({ message: error.message });        }
    };

    export const getAll = async (req, res) => {
        try {

            if (!req.headers.authorization) {
                throw new Error("Não autorizado")
            }

            const allTodos = await getAllTodos()
            res.status(200).json(allTodos)
        } catch (error) {
            loggers.info(`Erro no sistema: ${error.message}`);
            res.status(400).json({ message: error.message });        }
};
import { saveTodo, getAllTodos, getTodoById } from "../services/TodoService.js";
import logger from "../configs/logger.js";
import { body } from "express-validator";

export const create = async (req, res) => {
    try {
        const { title, description, dueDate} = req.body;

        if (!title || !description || !dueDate)
            throw new Error('Todos os campos são obrigatórios!');

        const userId = req.user.id;

        if (!userId)
            throw new Error('Usuário não encontrado!');

        const newTodo = await saveTodo({
            title,
            description,
            dueDate,
            user: userId
        });
        res.status(201).json(newTodo);
    } catch (error) {
        logger.info(`Erro no sistema: ${error.message}`);
        res.status(400).json({ message: error.message });
    };
};

export const getAll = async (req, res) => {
    const { id } = req.user;
    try {
        const allTodos = await getAllTodos(id);
        res.status(200).json(allTodos);
    } catch (error) {
        logger.info(`Erro no sistema: ${error.message}`);
        res.status(400).json({ message: error.message });
    };
};

export const getTodoByID = async (req, res) => {
    const { id } = req.params;
    try {
        const todoFromDb = await getTodoById(id);
        res.status(200).json(todoFromDb);
    } catch (error) {
        logger.info(`Erro no sistema: ${error.message}`);
        res.json({ message: error.message });
    };
};

export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const todoUpdated = await updateTodoById(id, body);
        res.status(200).json(todoUpdated);
    } catch (error) {
        logger.info(`Erro no sistema: ${error.message}`);
        res.json({ message: error.message });
    };
};
import { TodosModel } from "../models/Todo.js";
import { UsersModel } from "../models/Users.js";

export const    saveTodo = async ({ title, description, dueDate, user }) => {

    if (!title || !description || !dueDate) {
        throw new Error("Todos os campos são obrigatórios.");
    }
    if (!user) {
        throw new Error("Usuário não encontrado.");
    }

    try {
        const newTodo = await TodosModel.create({
            title,
            description,
            dueDate,
            user
        });
        await UsersModel.findByIdAndUpdate(user,
            { $push: { todos: newTodo._id } }
        );
        await TodosModel.findByIdAndUpdate(newTodo._id,
            { $push: { user: user._id } }
        );
        return newTodo;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllTodos = async (userId) => {
    try {
        const allTodos = await TodosModel.find({ user: userId });
        return await Promise.all(allTodos.map(async (todo) => {
            const userFromDb = await UsersModel.findById(todo.user);
            return {
                id: todo._id,
                title: todo.title,
                description: todo.description,
                dueDate: todo.dueDate,
                user: {
                    name: userFromDb.name,
                }
            };
        }));
    } catch (error) {
        throw new Error(error.message);
    };
};

export const getTodoById = async (id) => {
    try {
        const todoFromDb = await TodosModel.findById(id);
        if (!todoFromDb) {
            throw new Error("Id do todo não encontrado.");
        }
        return todoFromDb;
    } catch (error) {
        throw new Error(error.message);
    };
};

export const updateTodoById = async (id, body) => { 
    try {
        if (!id) {
            throw new Error("O campo id é obrigatório.");
        }

        if (!body.title || !body.description || !body.dueDate) {
            throw new Error("Todos os campos são obrigatórios.");
        }
        const todoFromDb = await TodosModel.findByIdAndUpdate({id, body}, { new: true });
        if (!todoFromDb) {
            throw new Error("Id do todo não encontrado.");
        }

    } catch (error) {
        throw new Error(error.message);
    }
};

const isAdmin = (userId) => {
    const userFromDb = UsersModel.findById(userId);
    if (userFromDb.role === 5150) {
        return true;
    }
}
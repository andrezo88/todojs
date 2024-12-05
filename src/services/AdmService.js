import { UsersModel } from "../models/Users.js";
import { TodosModel } from "../models/Todo.js";

export const updateRoleUser = async ( id, role ) => {

    if (!role) {
        throw new Error("O campo role é obrigatório.");
    }
    if (role !== 5150 && role !== 1050) {
        throw new Error("Role invalido.");
    }

    try {
        const roleChanged = await UsersModel.findByIdAndUpdate(id, { role }, { new: true });
        if (!roleChanged.id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new Error("Id do usuário não encontrado.");
        }
        if (roleChanged.role === role) {
            throw new Error("Role já cadastrado.");
        }

    } catch (error) {
        throw new Error(error.message);
    }
}

export const getUserById = async (id) => {
    const user = await UsersModel.findById(id);
    return user;
}

export const getAllUsers = async () => {
    const allUsers = await UsersModel.find();
    return allUsers;
};

export const getAllTodos = async () => {
    const allTodos = await TodosModel.find();
    return allTodos;
};
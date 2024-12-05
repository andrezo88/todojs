import { UsersModel } from "../models/Users.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const create = async ( name, email, password ) => {

    const user = await UsersModel.findOne({ email });

    if (user) {
        throw new Error("Email já cadastrado.");
    }
    if (!email) {
        throw new Error("O campo email é obrigatório.");
    }
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        throw new Error("O campo email deve ser um email válido.");
    }

    try {
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await UsersModel.create({
            name,
            email,
            password: hash
        })

        return ({name, email});
    } catch (error) {
        throw new Error(error.message);
    }
};

export const login = async ( email, password ) => {

    const user = await UsersModel.findOne({ email });
    if (!user) {
        throw new Error("Usuário não encontrado.");
    };

    const compareHash = bcrypt.compareSync(password, user.password);

    if (!compareHash) {
        throw new Error("Usuário e/ou senha inválidos.");
    };

    const token = jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }, process.env.SECRET_JWT, {
        expiresIn: '1day'
    });

    return { token };
};

export const findUsers = async () => {
    return await UsersModel.find();
};

export const findByIdUser = async (id) => {
    const user = await UsersModel.findById(id);
    return user;
};


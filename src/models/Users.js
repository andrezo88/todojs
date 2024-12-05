import mongoose, { Schema, model } from 'mongoose';
import { TodosModel }  from '/Users/andreabreu/Documents/todoJs/src/models/Todo.js';

const userSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 1050
    },
    todos: {
        type: Schema.Types.ObjectId,
        ref: "Todo"
    }
},
    {
        timestamps: true
    }
);

export const UsersModel = model("Users", userSchema);
import mongoose, { Schema, model } from 'mongoose';

const todoSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    dueDate: {
        type: Date,
        required: false,
        default: Date.now + 7
    },
    completed: {
        type: Boolean,
        required: false,
        default: false

    },
    completedAt: {
        type: Date,
        default: Date.now,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: true
    }
);

export const TodosModel = model("Todo", todoSchema);
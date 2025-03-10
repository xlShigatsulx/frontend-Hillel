import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  //_id: Schema.Types.ObjectId,
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export const todoModel = model("todo-collection", todoSchema, "todos");

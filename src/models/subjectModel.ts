import { InferSchemaType, model, Schema } from "mongoose";

const SubjectSchema = new Schema({
  code: { type: String, required: true },
  name: { type: String, maxlength: 250, required: true },
  department: { type: String, maxlength: 250, required: true },
  semester: { type: Number, required: true, min: 1 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  version: { type: Number, default: 1 },
});

const Subjects = model("Subject", SubjectSchema);
export default Subjects;
export type Subject = InferSchemaType<typeof SubjectSchema>;

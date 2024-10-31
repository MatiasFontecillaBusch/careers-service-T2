import { InferSchemaType, model, Schema } from "mongoose";

const SubjectRelationshipSchema = new Schema({
  subjectCode: { type: String, maxlength: 255, required: true },
  preSubjectCode: { type: String, maxlength: 255, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  version: { type: Number, default: 1 },
});

const SubjectsRelationships = model(
  "SubjectRelationship",
  SubjectRelationshipSchema
);
export default SubjectsRelationships;
export type SubjectsRelationship = InferSchemaType<typeof SubjectRelationshipSchema>;

import { model, Schema } from 'mongoose';

const CareerSchema = new Schema({
  _id: {
    type: Schema.Types.UUID,
    required: true,
    immutable: true,
  },
  name: { type: String, maxlength: 250, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  version: { type: Number, default: 1 },
});

const Careers = model('Career', CareerSchema);
export default Careers;

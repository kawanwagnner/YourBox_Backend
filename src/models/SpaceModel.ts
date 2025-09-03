import mongoose from '../db/mongo.ts';

const { Schema, model } = mongoose;

const SpaceSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  passwordHash: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const SpaceModel = model('Space', SpaceSchema);

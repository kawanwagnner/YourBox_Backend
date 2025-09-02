import mongoose from '../db/mongo.ts';

const { Schema, model } = mongoose;

const ItemSchema = new Schema({
  content: { type: String },
  fileUrl: { type: String },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ItemModel = model('Item', ItemSchema);

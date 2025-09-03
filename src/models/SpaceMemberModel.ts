import mongoose from '../db/mongo.ts';

const { Schema, model } = mongoose;

const SpaceMemberSchema = new Schema({
  spaceId: { type: Schema.Types.ObjectId, ref: 'Space', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['OWNER', 'EDITOR', 'VIEWER'], default: 'VIEWER' },
  createdAt: { type: Date, default: Date.now },
});

SpaceMemberSchema.index({ spaceId: 1, userId: 1 }, { unique: true });

export const SpaceMemberModel = model('SpaceMember', SpaceMemberSchema);

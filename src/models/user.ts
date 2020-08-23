'use strict';

import { Document, Schema, model } from "mongoose";
export interface IUser extends Document {
  name: string,
  password: string,
  surename: string,
  email: string,
  role: string,
  image: string,
  status: string,
}

const UserSchema = new Schema({
  name: { type: String },
  password: { type: String, required: true },
  surename: { type: String },
  email: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
  image: { type: String },
  status: { type: Schema.Types.ObjectId, ref: 'Status' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<IUser>('User', UserSchema);

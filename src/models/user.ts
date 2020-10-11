'use strict';

import { Document, Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'; // encryptador para passwords.

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
  email: { type: String, required: true, unique: true },
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
  image: { type: String },
  status: { type: Schema.Types.ObjectId, ref: 'Status' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', function (next) {
  const user: any = this;
  bcrypt.hash(user.password, 8)
  .then((hash: string) => {
    user.password = hash;
    next();
  })
  .catch((err: any) => {
    console.error(err);
  });  
});

export default model<IUser>('User', UserSchema);

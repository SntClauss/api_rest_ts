'use strict';

import { Document, Schema, model } from "mongoose";

export interface IStatus extends Document {
  name: String,
}

const StatusSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<IStatus>('Status', StatusSchema);

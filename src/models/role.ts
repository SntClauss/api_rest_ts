'use strict';

import { Document, Schema, model } from "mongoose";

export interface IRole extends Document {
    name: String,
}

const RoleSchema = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default model<IRole>('Role', RoleSchema);

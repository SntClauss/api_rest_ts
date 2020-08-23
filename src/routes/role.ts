'use strict';
import express from 'express';
import { mdAuth } from '../middlewares/authenticated';
import { RoleController } from '../controllers/role';

export const api = express.Router();

api.post(`/role`, RoleController.saveQuery);
api.get(`/role/:id`,  RoleController.selectQuery);
api.put(`/role/:id`,  RoleController.updateQuery);
api.delete(`/role/:id`, RoleController.deleteQuery);

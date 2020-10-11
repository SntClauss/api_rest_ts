'use strict';
import express from 'express';
import { mdAuth } from '../middlewares/authenticated';
import { StatusController } from '../controllers/status';

export const api = express.Router();

api.post(`/status`, StatusController.saveQuery);
api.get(`/status/:id`,  StatusController.selectQuery);
api.put(`/status/:id`,  StatusController.updateQuery);
api.delete(`/status/:id`, StatusController.deleteQuery);

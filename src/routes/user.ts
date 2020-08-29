'use strict';
import express from 'express'
import { UserController } from '../controllers/user';
import { mdAuth } from '../middlewares/authenticated';

export const api = require("express-promise-router")();

api.post('/register', UserController.register);
api.post('/login', UserController.loginUser);
api.put('/user/:id', UserController.selectQuery);
api.delete('/user/:id', UserController.deleteQuery);

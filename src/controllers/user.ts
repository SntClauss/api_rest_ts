'use strict';

import { Request, Response } from "express";

import User, { IUser } from '../models/user';
import { createToken } from '../services/jwt';
import bcrypt from 'bcryptjs'; // encryptador para passwords.


async function register(req: Request, res: Response): Promise<void> {
  const user: IUser = new User();
  user.set(req.body)
  user.save()
    .then((userSaved) => {
      res.status(200).send({ user: userSaved });
    })
    .catch((err: any) => {
      if (err.name === 'ValidationError') res.status(422).send({ error: err.message });
      else if (err.name === 'MongoError' && err.code === 11000)
        res.status(422)
          .send({ error: 'Duplicate key value (eg: email already exists)' });
      else res.status(500).send({ 'Internal Error' });
      console.error(err);
    });
}

async function loginUser(req: Request, res: Response): Promise<void> {
  User.findOne({ name: req.body.email || req.body.name || '' })
    .exec()
    .then(async (user) => {
      if (!user) throw Error();
      const check: boolean = await bcrypt.compare(req.body.password || '', user.password);
      if (!check) res.status(404).send({ message: 'Password not match' })
      else res.status(200).send({ token: createToken(user) })
    })
    .catch((err: any) => {
      res.status(500).send({ message: 'Internal Error' });
      console.error(err.message || err);
      if (err.stack) console.error(err.stack);
    });
}

async function selectQuery(req: Request, res: Response): Promise<void> {
  User.findOne({ _id: req.body._id })
    .exec()
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err: any) => {
      res.status(500).send({ message: 'Internal Error' });
      console.error(err);
    });
}

async function deleteQuery(req: Request, res: Response): Promise<void> {
  User.remove({ _id: req.params.id })
    .exec()
    .then((remove) => {
      res.status(200).send({ msg: remove });
    }).catch((err: any) => {
      res.status(500).send({ message: 'Internal Error' });
      console.error(err);
    });
}


export const UserController = {
  register,
  loginUser,
  selectQuery,
  deleteQuery
};

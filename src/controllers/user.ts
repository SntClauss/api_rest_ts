'use strict';

import { Request, Response } from "express";

import User, { IUser } from '../models/user';
import { createToken } from '../services/jwt';
import bcrypt from 'bcryptjs'; // encryptador para passwords.


const register = async (req: Request, res: Response): Promise<void> => {
  const status: IUser = new User();
  status.set(req.body)
  try {
    const saved = await status.save()
    const statusCode: number = saved ? 201 : 404;
    res.status(statusCode).send({saved});
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }

}

const loginUser = async (req: Request, res: Response): Promise<void> =>
  User.findOne({ email: req.body.email || '' })
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


const updateQuery = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body);
    const statusCode: number = updated ? 201 : 404;
    res.sendStatus(statusCode);
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
}

const selectQuery = async (req: Request, res: Response): Promise<void> => {
  try {
    const selected = await User.findOne({ _id: req.params.id })
    const statusCode: number = selected ? 201 : 404;
    res.status(statusCode).send({ selected });
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
}



const deleteQuery = async (req: Request, res: Response): Promise<void> => {
  try {
    const selected = await User.remove({ _id: req.params.id })
    const statusCode: number = selected ? 201 : 404;
    res.status(statusCode);
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
}


export const UserController = {
  register,
  loginUser,
  selectQuery,
  deleteQuery,
  updateQuery,
};

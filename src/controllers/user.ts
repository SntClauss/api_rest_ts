'use strict';

import { Request, Response } from "express";
import bcrypt from 'bcryptjs'; // encryptador para passwords.

import User, { IUser } from '../models/user';
import { createToken } from '../services/jwt';


// funcion para guardar nuevos usuarios
function register(req: Request, res: Response) {
  const user: IUser = new User();
  user.set(req.body)
  if (user.password) {
    // Encriptar y guardar password
    bcrypt.hash(user.password,'', (err: any, hash: string) => {
      user.password = hash;
      if (user.name != null || user.status != null ) {
        // Guardar el usuario        
        user.save((err_: any, userStored: IUser) => {
          if (err_) {
            res.status(500).send({ message: 'Error al guardar el usuario' });
          } else if (!userStored) {
            res.status(404).send({ message: 'No se ha registrado el usuario' });
          } else {
            res.status(200).send(JSON.stringify(userStored));
          }
        });
      } else {
        res.status(200).send({ message: 'Rellena todos los campos' });
      }
    });
  } else {
    res.status(200).send({ message: 'Introduce la contraseña' });
  }
}

// funcion para login de usuarios
function loginUser(req: Request, res: Response) {
  const usr: IUser = new User();
  usr.set(req.body)

  User.findOne({ name: usr.name }, (err, user: IUser) => {
    if (err) {
      res.status(500).send({ message: 'Error en la peticion' });
    } else if (!user) {
      res.status(404).send({ message: 'El usuario no existe' });
    } else {
      // Comprobar la contrasena
      bcrypt.compare(usr.password, user.password.toString(), (err_: any, check: any) => {
        if (err_) res.status(500).send({ message: 'Error al intentar autenticar' });
        if (check) {
          res.status(200).send({
            token: createToken(user),
          });
        } else {
          res.status(404).send({ message: 'El usuario no ha podido loguearse' });
        }
      });
    }
  });
}

function selectQuery(req: Request, res: Response) {
  User.find({ _id: req.body._id }, (err: any, finded: any) => {
      if (err) res.status(404).send({
          message: 'Error en encontrar el objeto',
          error: err,
      });
      else res.status(200).send({ msg: 'OK!' });
  });
}

function deleteQuery(req: Request, res: Response) {
  const objectId = req.params.id;
  User.findByIdAndRemove(objectId, (err: any, removed: any) => {
      if (err) res.status(404).send({
          message: 'El objeto no a sido eliminado o no existe',
          error: err,
      });
      else res.status(200).send({ msg: 'OK!' });
  });
}


export const UserController = {
  register,
  loginUser,
  selectQuery,
  deleteQuery
};

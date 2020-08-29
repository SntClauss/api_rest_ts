'use strict';

import { Request, Response } from "express";
import Role, { IRole } from '../models/role';

const saveQuery = async (req: Request, res: Response) => {
    const role: IRole = new Role();
    role.set(req.body)
    role.save()
    .then(saved => res.status(200).send({ saved }))
    .catch((err: any) => {
        if (err.name === 'ValidationError') res.status(422).send({ error: err.message });
        else if (err.name === 'MongoError' && err.code === 11000)
          res.status(422)
            .send({ error: 'Duplicated key value' });
        else res.status(500).send({ error: 'Internal Error' });
        console.error(err);
      });
}

const updateQuery = async (req: Request, res: Response) => {
    const id = req.params.id;
    const update = req.body;
    Role.findByIdAndUpdate(id, update)
    .exec()
    .then((updated) => res.status(200).send({ updated }))
    .catch((err: any) => {
        res.status(500).send({ message: 'Internal Error' });
        console.error(err);
      })    
}

const selectQuery = async (req: Request, res: Response) => 
    Role.findOne({ _id: req.body._id })
      .exec()
      .then((selected) => {
        res.status(200).send({ selected });
      })
      .catch((err: any) => {
        res.status(500).send({ message: 'Internal Error' });
        console.error(err);
      });
  
  
  const deleteQuery = async (req: Request, res: Response) => 
    Role.remove({ _id: req.params.id })
      .exec()
      .then((removed) => {
        res.status(200).send({ msg: removed });
      }).catch((err: any) => {
        res.status(500).send({ message: 'Internal Error' });
        console.error(err);
      });
  

export const RoleController = {
    saveQuery,
    selectQuery,
    updateQuery,
    deleteQuery,
};
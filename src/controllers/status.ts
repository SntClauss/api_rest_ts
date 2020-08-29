'use strict';

import { Request, Response } from "express";
import Status, { IStatus } from '../models/status';

const saveQuery = async (req: Request, res: Response): Promise<void> => {
    const status: IStatus = new Status();
    status.set(req.body)
    status.save()
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

const updateQuery = async (req: Request, res: Response): Promise<void> =>  {
    const id = req.params.id;
    const update = req.body;
    Status.findByIdAndUpdate(id, update)
    .exec()
    .then((updated) => res.status(200).send({ updated }))
    .catch((err: any) => {
        res.status(500).send({ message: 'Internal Error' });
        console.error(err);
      })    
}

const selectQuery = async(req: Request, res: Response): Promise<void> => 
    Status.findOne({ _id: req.body._id })
      .exec()
      .then((selected) => {
        res.status(200).send({ selected });
      })
      .catch((err: any) => {
        res.status(500).send({ message: 'Internal Error' });
        console.error(err);
      });
  
  
  const deleteQuery = async(req: Request, res: Response): Promise<void> => 
    Status.remove({ _id: req.params.id })
      .exec()
      .then((removed) => {
        res.status(200).send({ msg: removed });
      }).catch((err: any) => {
        res.status(500).send({ message: 'Internal Error' });
        console.error(err);
      });
  

export const StatusController = {
    saveQuery,
    selectQuery,
    updateQuery,
    deleteQuery,
};
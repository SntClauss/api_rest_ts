'use strict';

import { Request, Response } from "express";
import Status, { IStatus } from '../models/status';

const saveQuery = async (req: Request, res: Response): Promise<void> => {
  const status: IStatus = new Status();
  status.set(req.body)
  try {
    const saved = await status.save()
    const statusCode: number = saved ? 201 : 404;
    res.status(statusCode).send({ saved });
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }

}

const updateQuery = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Status.findByIdAndUpdate(req.params.id, req.body);
    const statusCode: number = updated ? 201 : 404;
    res.sendStatus(statusCode);
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
}

const selectQuery = async (req: Request, res: Response): Promise<void> => {
  try {
    const selected = await Status.findOne({ _id: req.params.id })
    const statusCode: number = selected ? 201 : 404;
    res.status(statusCode).send({ selected });
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
}



const deleteQuery = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Status.remove({ _id: req.params.id })
    const statusCode: number = deleted ? 201 : 404;
    res.sendStatus(statusCode);
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
}

export const StatusController = {
  saveQuery,
  selectQuery,
  updateQuery,
  deleteQuery,
};
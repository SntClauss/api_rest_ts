'use strict';

import { Request, Response } from "express";
import Role, { IRole } from '../models/role';

const saveQuery = async (req: Request, res: Response): Promise<void> => {
  const status: IRole = new Role();
  status.set(req.body)
  try {
    const saved = await status.save()
    const statusCode: number = saved ? 201 : 404;
    res.sendStatus(statusCode);
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }

}

const updateQuery = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Role.findByIdAndUpdate(req.params.id, req.body);
    const statusCode: number = updated ? 201 : 404;
    res.sendStatus(statusCode);
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
}

const selectQuery = async (req: Request, res: Response): Promise<void> => {
  try {
    const selected = await Role.findOne({ _id: req.params.id })
    const statusCode: number = selected ? 201 : 404;
    res.status(statusCode).send({ selected });
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
}



const deleteQuery = async (req: Request, res: Response): Promise<void> => {
  try {
    const selected = await Role.remove({ _id: req.params.id })
    const statusCode: number = selected ? 201 : 404;
    res.status(statusCode).send({ selected });
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
}

export const RoleController = {
  saveQuery,
  selectQuery,
  updateQuery,
  deleteQuery,
};
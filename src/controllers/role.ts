'use strict';

import { Request, Response } from "express";
import Role, { IRole } from '../models/role';

function saveQuery(req: Request, res: Response) {
    const role: IRole = new Role();
    role.set(req.body)
    role.save((err: any, saved: any) => {
        if (err) res.status(404).send({
            message: 'Error al guardar el objecto',
            error: err,
        });
        else {
            res.status(200).send({ msg: 'OK!' });
        }
    })
}

function updateQuery(req: Request, res: Response) {
    const id = req.params.id;
    const update = req.body;
    Role.findByIdAndUpdate(id, update, (err: any, updated: any) => {
        if (err) res.status(404).send({
            message: 'No se ha podido actualizar usuario',
            error: err,
        });
        else res.status(200).send({ msg: 'OK!' });

    });
}


function selectQuery(req: Request, res: Response) {
    Role.find({ _id: req.params.id }, (err: any, finded: any) => {
        if (err) res.status(404).send({
            message: 'Error en encontrar el objeto',
            error: err,
        });
        else res.status(200).send({ msg: 'OK!' });
    });
}

function deleteQuery(req: Request, res: Response) {
    const objectId = req.params.id;
    Role.findByIdAndRemove(objectId, (err: any, removed: any) => {
        if (err) res.status(404).send({
            message: 'El objeto no a sido eliminado o no existe',
            error: err,
        });
        else res.status(200).send({ msg: 'OK!' });
    });
}

export const RoleController = {
    saveQuery,
    selectQuery,
    updateQuery,
    deleteQuery,
};
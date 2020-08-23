'use strict';

import { Request, Response } from "express";
import Status, { IStatus } from '../models/status';

function saveQuery(req: Request, res: Response) {
    const status: IStatus = new Status();
    status.set(req.body)
    status.save((err: any, saved: any) => {
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
    Status.findByIdAndUpdate(id, update, (err: any, updated: any) => {
        if (err) res.status(404).send({
            message: 'No se ha podido actualizar usuario',
            error: err,
        });
        else res.status(200).send({ msg: 'OK!' });

    });
}


function selectQuery(req: Request, res: Response) {
    Status.find({ _id: req.params.id }, (err: any, finded: any) => {
        if (err) res.status(404).send({
            message: 'Error en encontrar el objeto',
            error: err,
        });
        else res.status(200).send({ msg: 'OK!' });
    });
}

function deleteQuery(req: Request, res: Response) {
    const objectId = req.params.id;
    Status.findByIdAndRemove(objectId, (err: any, removed: any) => {
        if (err) res.status(404).send({
            message: 'El objeto no a sido eliminado o no existe',
            error: err,
        });
        else res.status(200).send({ msg: 'OK!' });
    });
}

export const StatusController = {
    saveQuery,
    selectQuery,
    updateQuery,
    deleteQuery,
};
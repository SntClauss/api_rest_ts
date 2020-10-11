'use strict';
import { Request, Response } from "express";

import jwt from 'jwt-simple';
import moment from 'moment';
const secret: string = 'dMCA4!@cRzDpj1';


const ensureAuth = (req: Request, res: Response, next: any) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'The request has no authorization header' });
    }
    const token = req.headers.authorization.replace(/['"]+/g, '');
    const payload = jwt.decode(token, secret);

   try {
        if (payload.exp <= moment.unix(moment.now())) {
            return res.status(401).send({ message: 'Token expired' });
        }
        
    } catch (ex) {
        return res.status(404).send({ message: 'Token not valid' });
    }

    req.body.user = payload;
    return next();
};

export const mdAuth = {
    ensureAuth,
};

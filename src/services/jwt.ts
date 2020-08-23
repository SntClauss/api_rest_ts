'use strict';

import jwt from 'jwt-simple';
import moment from 'moment';
import { IUser } from '../models/user';

const secret: string = 'dMCA4!@cRzDpj1';

export function createToken (user: IUser) {
    const payload = {
        sub: user._id,
        name: user.name,
        surname: user.surename,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(), // fecha de creacion
        exp: moment().add(30, 'days').unix, // fecha de expiracion
    };

    return jwt.encode(payload, secret);
};

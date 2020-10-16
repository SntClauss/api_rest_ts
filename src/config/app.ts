'use strict';

const express = require('express');
const bodyParser = require('body-parser');

export const app = express();

import * as userRoutes from '../routes/user';
import * as roleRoutes from '../routes/role';
import * as statusRoutes from '../routes/status';


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', userRoutes.api);
app.use('/api', roleRoutes.api);
app.use('/api', statusRoutes.api);

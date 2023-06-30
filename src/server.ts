import {Request, Response} from "express";

const express = require("express");

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();
router.get('/test', (req: Request, res : Response) => res.send('Hello world !'));
app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});

import * as fs from 'fs';

const words = fs.readFileSync('./words.txt', 'utf-8');
console.log(words);
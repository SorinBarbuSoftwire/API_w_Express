import {Request, response, Response} from "express";
const express = require("express");
import * as fs from 'fs';
const axios = require("axios");

const roverData:string = fs.readFileSync('./data/rovers.json', 'utf-8');

const app = express();
const port = 8000;

app.use(express.json());
const routerTest = express.Router();
const routerRovers = express.Router();
routerTest.get('/test', testController);
routerRovers.get('/rovers', roverController)
app.use('/', routerTest);
app.use('/', routerRovers);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});

function testController(req:Request, res:Response) : void {
    res.send('Hello world !');
}

function roverController(req:Request, res:Response) : void {
    res.send(roverData);
    // axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=t2DwwSTymKQ5rd5M9h0hc6xdL9lPuchtdQx37pDV")
    //     .then((response) => {
    //         res.send(response);
    //     })

}
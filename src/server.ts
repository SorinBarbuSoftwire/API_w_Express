import {Request, response, Response} from "express";
const express = require("express");
const axios = require("axios");
import {AxiosResponse} from "axios";
import {AxiosError} from "axios";
import * as fs from 'fs';

const roverData: string = fs.readFileSync('./data/rovers.json', 'utf-8');
const roverDataURL: string = "https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=t2DwwSTymKQ5rd5M9h0hc6xdL9lPuchtdQx37pDV";

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
    // Avoid to many requests
    // axios.get(roverDataURL)
    //     .then((response: AxiosResponse) => {res.send(response.data);})
    //     .catch((error:AxiosError) => {console.log(error.response);});
}
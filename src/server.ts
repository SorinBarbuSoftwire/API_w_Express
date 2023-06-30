import {Request, response, Response} from "express";
const express = require("express");
const axios = require("axios");
import {AxiosResponse} from "axios";
import {AxiosError} from "axios";

const apiKey: string = "t2DwwSTymKQ5rd5M9h0hc6xdL9lPuchtdQx37pDV";
const roverDataURL: string = "https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=" + apiKey;

const app = express();
const port:number = 8000;

const routerTest = express.Router();
const routerRovers = express.Router();
const routerRoversCuriosity = express.Router();
// const routerRovers
app.use(express.json());
routerTest.get('/test', testController);
routerRovers.get('/rovers', roverController)
app.use('/', routerTest);
app.use('/', routerRovers);
// routerRovers.use("/", )

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});

function testController(req:Request, res:Response) : void {
    res.send('Hello world !');
}

function roverController(req:Request, res:Response) : void {
    axios.get(roverDataURL)
        .then((response: AxiosResponse) => {res.send(response.data);})
        .catch((error:AxiosError) => {console.log(error.response);});
}
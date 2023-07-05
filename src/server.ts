const express = require("express");
const axios = require("axios");
const cors = require("cors");
import {Request, Response} from "express";
import {AxiosResponse} from "axios";
import {AxiosError} from "axios";

const apiKey: string = "t2DwwSTymKQ5rd5M9h0hc6xdL9lPuchtdQx37pDV";
const baseURL: string = "https://api.nasa.gov/mars-photos/api/v1/";
const roversRoute: string = "rovers";
const photosRoute: string = "photos";

const app = express();
const port:number = 8000;

const routerTest = express.Router();
const routerRovers = express.Router();

app.use(cors());
app.use(express.json());
app.use('/', routerTest);
app.use('/', routerRovers);
routerTest.get('/test', testController);
routerRovers.get('/rovers', roversController)
routerRovers.get("/rovers/:rover_name/photos/:camera_type", photosController);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});

function testController(req:Request, res:Response) : void {
    res.send('Hello world !');
}

function roversController(req:Request, res:Response) : void {
    axios.get(baseURL + roversRoute, {
        params: {
            api_key: apiKey
        }
    })
        .then((response: AxiosResponse) => {res.send(response.data);})
        .catch((error:AxiosError) => {console.log(error.response);});
}

function photosController(req:Request, res:Response) : void {
    const roverName: string = req.params.rover_name;
    const cameraType: string = req.params.camera_type;
    let sol: string = '';

    if (roverName !== "curiosity" &&
        roverName !== "opportunity" &&
        roverName !== "spirit") {

        res.send("Wrong Rover!");
        return;
    }

    if (req.query.sol != undefined) {
        sol = req.query.sol as string;
    }

    axios.get(baseURL + roversRoute + "/" + roverName + "/" + photosRoute, {
            params: {
                sol: sol,
                camera: cameraType,
                api_key: apiKey
            }
    })
        .then((response: AxiosResponse) => {res.send(response.data as String);})
        .catch((error:AxiosError) => {console.log(error.response);});
}
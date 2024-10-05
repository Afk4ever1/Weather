/* 1- import modules */
import express from "express";
import axios from "axios";

/* 2- set main consts */
const app = express();
const port = 3000;
const API_URL = "https://api.open-meteo.com/v1/forecast";
/* 3- set the static file */
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
/* 4- render index.ejs file when the server starts */
/* 4.1-set the parameter {
    douala{
        lat: 36.825022484718126 
        long: 10.605679635377564
    }
    smar{
        lat: 32.99447912346489
        long: 10.828313537385258
    }
    mourouj{
        lat: 36.74228799271991 
        long: 10.199646796183234
    }        
} */
    const doualaParams = {
        latitude: "36.825022484718126",
        longitude: "10.605679635377564",
        current: "temperature_2m",
        daily: "temperature_2m_max,temperature_2m_min,weather_code",
        forecast_days: "1",
        hourly: "is_day"
    };
    const smarParams = {
        latitude: "32.99447912346489",
        longitude: "10.828313537385258",
        current: "temperature_2m",
        daily: "temperature_2m_max,temperature_2m_min,weather_code",
        forecast_days: "1",
        hourly: "is_day"
    };
    const slimParams = {
        latitude: "36.74228799271991",
        longitude: "10.199646796183234",
        current: "temperature_2m",
        daily: "temperature_2m_max,temperature_2m_min,weather_code",
        forecast_days: "1",
        hourly: "is_day"
    };

    app.get("/", async (req,res) =>{
        try{
           const requests = [
             axios.get(API_URL, {params: doualaParams}),
             axios.get(API_URL, {params: smarParams}),
             axios.get(API_URL, {params: slimParams})
           ];

            const [response1, response2, response3] = await axios.all(requests);
            const [douala, smar, slim] = [response1.data, response2.data, response3.data];
            res.render("index.ejs", {douala: douala, smar: smar, slim: slim });
        } catch(error){
            console.error("we're secrewed" , error.message);
            res.render("index.ejs", {douala: error.messaage, smar: error.message, slim:error.message});
        }
    
    })
/* 5- listen for the server on the 3000 port */
    app.listen(port, ()=>{
        console.log(`We're running on ${port}`);
    });
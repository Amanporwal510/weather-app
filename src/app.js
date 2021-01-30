const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

/**************************************
    Define Path for Express Config
**************************************/
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

/***********************************************************
    Setup for handelbars (view engine & views location)
************************************************************/
app.set('views', viewPath); // by default directory set to (views directory) under the root directory
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

/**************************************
    Setup Static directory to serve
**************************************/
// app.use('/static',express.static(publicDirectoryPath));
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Aman Porwal"
    })
});

app.get('/about', (req, res) => {
    res.render("about", {
        title: "About Page",
        name: "Aman Porwal"
    })
});

app.get('/help', (req,res) => {
    res.render("help", {
        title: "Help Page",
        name: "Aman Porwal",
        message: "mail at : amanporwal510@gmail.com"
    });
});

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    let address = req.query.address;
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send(error);
        }
        forecast(latitude, longitude, (error, data) => {
            if(error) {
                return res.send(error);
            }
            res.send(data);
        });
    });
});

app.get('/help/*', (req, res)=> {
    res.render('404', {
        title: "404 Page",
        name: "Aman Porwal",
        errorMessage : "Help Article Not Found"
    });
});

app.get('*', (req, res) => {
    res.render('404.hbs', {
        title: "404 Page not Found",
        name: "Aman Porwal",
        errorMessage : "404 Page Not Found"
    })
});

app.listen(3000, () => {
    console.log("Server is up at port 3000");
})
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express();

const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nirajan Karki'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nirajan Karki'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Nirajan Karki'
    })
})

app.get('', (request, response) => {
    response.send('<h1>Weather</h1>');
})
// app.get('/help', (req,res)=> {
//     res.send([{name: 'Nirajan', age: 27}, {name: 'Hari', age: 34}])
// })
//
// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address!'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
            if(error){
                return res.send({ error })
            }
            forecast(latitude,longitude, (error, forcastData) => {
                console.log('--',forcastData)
                if(error){
                    return res.send({ error })
                }
                // console.log(location)
                console.log('Data', forcastData)

                res.send({forcast: forcastData,
                    location: location,
                    address: req.query.address
                })
            })
        })
    }

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nirajan Karki',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nirajan Karki',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})

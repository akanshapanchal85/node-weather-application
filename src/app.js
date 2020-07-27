const hbs = require('hbs')
const path = require('path')
const express = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//define paths for express confriguration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')


//set up handlebars and views location
app.set('view engine' , 'hbs')
app.set('views' , viewsDirectoryPath)
hbs.registerPartials(partialsPath)


//set up static directory to server
app.use(express.static(publicDirectoryPath))

app.get('' , (req,res)=>{
    res.render('index' ,{
         title : 'WEATHER APP',
         name  :'Akansha Panchal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about' ,{
         
          name : 'Akansha Panchal'
    })
})

app.get('/help' , (req,res)=>{
    res.render('help' , {
        name : 'Akansha Panchal'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

// app.get('/products' , (req,res)=>{
//     if(!req.query.rating){
//        return res.send('<h1>Must provide the search term</h1>')
//     }
//        console.log(req.query.rating)
//     res.send({
//          products : []
//     })
// })


app.get('/about/*' , (req,res) => {
    res.send('About page not found !Try some other url')
})

app.get('/help/*' , (req,res) => {
    res.render('404-page', {
        title : '404 page',
        name : 'Akansha',
        error : 'Help article not found'
     })
})

app.get( '*', (req , res) => {
    res.render('404-page', {
       title : '404 page',
       name : 'Akansha',
       error : 'Page not found sorry'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})
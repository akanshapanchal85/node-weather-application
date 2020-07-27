const request = require ('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3527b917ab32a4f12f1ec27e1a29ceb6&query=' + latitude + ',' + longitude + '&units=m'
     
    

    request({ url, json :  true }, (error , {body} )=>{
        if (error){
            callback('It seems like you are not connected to the internet. Please check again later!',undefined)

        } else if (body.error) {
            callback ('Unable to find , please try again !',undefined)
        } else {
            callback (undefined , ('Today is ' +body.current.temperature+ ' degree celsius . It feels like ' + body.current.feelslike + ' degree celsius. The weather is '+ body.current.weather_descriptions[0]))
        }
    })
    
}

module.exports = forecast
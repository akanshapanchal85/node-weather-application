const request = require('request')

const geocode = (address , callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWthbnNoYXBhbmNoYWwiLCJhIjoiY2tja2pxZ2xsMHl4ODJycDVpem81aTQ4aSJ9.F9gP7lyEC3RK_62_-Yj8oA&limit=1'
    
  
    // const {url , json} = geocodeObjectDestruction
    request({ url , json : true }  ,(error , { body }) => {
         if(error) {
             callback('Sorry cannot find the internet connection!', undefined)
         } else if(body.features.length === 0 ) {
             callback('Unable to find location. Try another search!' , undefined );
 
         } else {
             callback(undefined , {
                 latitude : body.features[0].center[1],
                 longitude : body.features[0].center[0],
                 location :  body.features[0].place_name
             })
         }
    })
 
 }

 module.exports = geocode 
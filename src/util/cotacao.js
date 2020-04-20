const request = require('request')

const url = 'https://api.worldtradingdata.com/api/v1/stock?symbol='
const apiToken = ',TWTR&api_token=cFkySN6Uqw6jR7TTOC4idcJOZ14u1059HPFZD7GVE6Jh6W56gvguERzbb43B'

const cotacao = (codigo, callback) =>{

    const fullUrl = url + codigo + apiToken

    request({url: fullUrl, json: true}, (err, response) =>{

        if(err|| response.body.data === undefined || response.body === undefined ){
            callback({
                mensage: "Data Not Found"
            }, undefined)
        } else{
                 const parsedJSON = response.body.data[0]
                 const {name,  price_open,  price,  day_high,  day_low } =   parsedJSON                 
                 return callback(undefined, {name,  price_open,  price,   day_high,  day_low })
             }   
    })
}     

module.exports = cotacao


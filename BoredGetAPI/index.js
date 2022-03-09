const axios = require('axios');

exports.handler = function index(event, context, callback){
    //actual body code: handles getting a response
    //from the bored API.
    console.log("Getting Bored API requested item...");
    axios.get('https://www.boredapi.com/api/activity/').then(response => {
        console.log(response.data);
        callback(null, JSON.stringify(response.data));
    }).catch(error => {
        console.log(error);
        return error;
    });
};

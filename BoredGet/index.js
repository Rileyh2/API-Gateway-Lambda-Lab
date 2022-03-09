//required npm package to connect to DynamoDB client
const AWS = require('aws-sdk');

exports.handler = function index(event, context, callback){

    //creates Dynamo client and specifies table name to insert into
    const client = new AWS.DynamoDB.DocumentClient();
    var table_name = "BoredApiExampleTable";
    
    console.log(event.queryStringParameters);
    var table_val = event.queryStringParameters.tableName;
    if(table_val){
        table_name = table_val;
    }
    
    //this is the section in which any or all parameters
    //are passed. For the delete method this is going to
    //mainly include the key and table name.
    var user = event.queryStringParameters.UserID;
    var entrynum = parseInt(event.queryStringParameters.EntryNumber);
    var params = {
        TableName: table_name,
        Key: {
            UserID: user,
            EntryNumber: entrynum
        }
    };
    
    //code to delete item based on primary key passed in.
    client.get(params, function(err, data){
        if(err){
            callback(null, JSON.stringify({
                statusCode: 400,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(err)
            }));
        }
        else{
            callback(null, JSON.stringify({
                statusCode: 200,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }));
        }
    });
};

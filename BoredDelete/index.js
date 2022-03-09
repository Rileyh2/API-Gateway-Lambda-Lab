//required npm package to connect to DynamoDB client
const AWS = require('aws-sdk');

exports.handler = function index(event, context, callback){

    //creates Dynamo client and specifies table name to insert into
    const client = new AWS.DynamoDB.DocumentClient();
    var table_name = "BoredApiExampleTable";
    
    var body = JSON.parse(event.body);
    if(body.tableName){
        table_name = body.tableName;
    }
    
    //this is the section in which any or all parameters
    //are passed. For the delete method this is going to
    //mainly include the key and table name.
    var params = {
        TableName: table_name,
        Key: body.payload.key
    };
    
    //code to delete item based on primary key passed in.
    client.delete(params, function(err, data){
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

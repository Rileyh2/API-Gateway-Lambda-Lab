//required npm package to connect to DynamoDB client
const AWS = require('aws-sdk');

//note that in order for this to run locally, you need to configure
//using AWS.config
exports.handler = function index(event, context, callback){

    //creates Dynamo client and specifies table name to insert into
    const client = new AWS.DynamoDB.DocumentClient();
    var table_name = "BoredApiExampleTable";
    
    var body = JSON.parse(event.body);
    if(body.tableName){
        table_name = body.tableName;
    }
    
    //this is the section in which any or all parameters
    //are passed. For a query this requires key conditional 
    //expressions with expressionattributenames and expressionattributevalues
    //sections
    var params = {
        TableName: table_name,
        Item: body.payload.item
    };
    

    //asyncronous function that runs and returns the response
    //of putting creating an item, else catch an error in creation
    async function createItem(){
        try{
            var response = await client.put(params).promise();
            callback(null, JSON.stringify({
                statusCode: 200,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    response: JSON.stringify(response)
                }
            )}));
        }
        catch(err){
            console.error("An error has occured. Error value:", JSON.stringify(err,null,2));
            callback(null, JSON.stringify({
                statusCode: 400,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(err)
            }));
        }
    }
    
    //run the function
    createItem();

};

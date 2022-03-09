//configuration setup for the table.
//Note that the access ID and secret 
//are mainly for if you are connecting to DynamoDB
//locally from your own end, otherwise they are
//not used within the Lambda function.
module.exports = {
    aws_remote_config: {
        region: "us-east-1",
        accessKeyId: "AKIA566ZO7ZZF2OU3WC2",
        secretAccessKey: "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"
    }
}
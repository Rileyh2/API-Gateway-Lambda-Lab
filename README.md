# Lab Practice: Configuring an API using API Gateway, Lambda functions, and DynamoDB

## Notes before beginning

As some quick notes before writing the rest of this file, this was mainly a lab for
my own purposes of getting hands on experience in integrating different services on 
AWS to create an API system, and was for educational purposes only. I don't intend
on fleshing this project out.

There are a couple of main reasons as to why I wanted to do this project. One is in
order to get a better grasp on concepts I've been learning about through training
for the developer associate-level exam for AWS through hands-on experience, 
which includes all of the services included (minus postman). In addition to this, I wanted to work
on how I would organize my code in an environment that is styled more
like microservices, event-driven architecture, and functions as a service.

## Creating the functions

While the functions can just be created in the AWS console, I wanted experience closer to what I would
be doing in a developer environment, so I Instead worked through testing the function logic locally
on my own machine before zipping the directory up. AWS Lambda functions work in that they only accept files
which are all zipped up or put into an S3 bucket. 

Once that was done, I tested on AWS to see what would happen. Some of the things I ran into were
a handler error since I didn't structure the index function correctly at first, as well as 
having to realize the structure in which responses were passed back to AWS was much different than
just returning a value and would depend on whether my function was asynchronous or synchronous.

After this I started work on the other functions, which I will detail in the following section.

## Creating Lambda Functions Which Interact With DynamoDB

The main difference in the procedure in working with functions that work with the dynamoDB
service versus working with functions that just work with external APIs or do function logic
is that because the function now also requires the appropriate resources/permissions to access
the bucket. Locally this means creating a configuration file for which I would create a new IAM
role/user that would proper access depending on the function like how database
access for things such as MongoDB work. On the other hand, uploading the code and testing in Lambda just
requires adding an Execution role with the appropriate permissions. 

In terms of writing functions to perform puts/updates/deletes on the table, it follows similar 
logic to something like MongoDB. One thing to note is the fact that when updating/deleting, 
the parameters passed in work off of a "key" in the parameters with the values for the partition/sort
key while the values for putting in are put in an "item" value in the parameters. Getting items
also is done via several functions such as query, get, and scan.

### Sidenote: Using Layers

While writing this code and having to upload the dependencies for the aws-sdk, it can be a large
file and would have to be repeated several times which doesn't seem good. To get around this I used
Lambda layers, which are a way to upload layers that are applied at runtime to the function and can include
things such as the node module dependencies. In this way if you have a set of dependencies that you 
rely on for multiple functions such as for the put/update/delete/getting of table data, then you can create
one layer which multiple functions can then use. This also seems to have an option for being used for multiple
different runtime environments and languages as well.

## Attaching the functions to API Gateway

Once this was done I created the API in API Gateway, doing most of the work in the console.
I created endpoints/methods for the functions I had created as well as a testing stage. Once I 
added the integrations for the appropriate Lambda functions to the code, I then deployed the
changes to the testing stage. If I were to continue further, I would then deploy the changes
to a production stage once they were fully done/tested or would use traffic management with 
something like a Canary deployment.

## Testing the endpoints

Depending on what type of API you chose for API gateway, this can go several ways. With a REST
API, there are ways to do testing within the console itself, but if choosing the lower cost option
of using an HTTP API means using external testing methods such as the Postman agent to run API calls.
This can be done through exporting the API in API gateway and then importing it into Postman. 

Note that in testing, the way in which information is passed through an HTTP API is going to differ
from using Lambda testing, mainly in the fact that for Lambda data is passed in as regular JSON. The http
API will pass in the event "body" item as a string, which requires JSON.parse() to read.

As another note: using CloudWatch Logs is especially useful for reading errors from the Lambda functions
as they run. I found it useful to add permissions for CloudWatch to the execution roles for the Lambda 
functions.

## Conclusions

In working on this small project, I was able to get more experience in how these services
interact with each other as well as reinforcing concepts such as least privelege in permissions
or even just reusing layers and dependencies for similar functions. It was beneficial being able to see how this
system could work in a project as well as what benefits as well as challenges there
could be in creating an API solution like this.

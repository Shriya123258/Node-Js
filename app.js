//Shriya Pratapwar
//Establish Connection with MongoDB
const http = require("http");
const Express = require("express");
const BodyParser = require("body-parser");
const fs = require('fs');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb+srv://backendconcoxdeveloper:V3jUV7QXqEoAtnhy@cluster0-zhjde.mongodb.net";
const DATABASE_NAME = "__CONCOX__";

var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;

//Build  API Endpoints
app.post("/devices", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    })
})
app.get("/",(request,response)=>{
    response.send("Name:" +request.query.name)
})

//create an endpoint to retrieve all the records data
app.get("/devices", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    })
})

//retrieve a single record according to its ID.
app.get("/devices/:id", (request, response) => {
    collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    })
})
app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("devices");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    })
})

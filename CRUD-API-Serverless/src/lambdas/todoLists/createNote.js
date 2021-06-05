'use strict';
const responses = require("../../common/API-Responses");
const Dynamo = require('../../common/Dynamo');
const tableName1 = process.env.myDynamoDBTable1;
// TODO-LIST
//ENDPOINTS FOR CRUD IMPLEMENTATION

// CREATE NEW TODOLIST

exports.handler = async (event) => {
    try {
        if (!event.body) return responses._400({ message: "Request has no body" });

        const theNote = JSON.parse(event.body);

        const noteDB = await Dynamo.write(theNote, tableName1);

        return responses._201(noteDB);

    } catch (error) {
        console.log(error);
        return responses._400({ errorMessage: error.message });
    }
};
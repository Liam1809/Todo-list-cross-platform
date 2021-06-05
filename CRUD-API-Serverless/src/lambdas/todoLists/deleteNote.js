'use strict';
const responses = require("../../common/API-Responses");
const Dynamo = require('../../common/Dynamo');
const tableName1 = process.env.myDynamoDBTable1;
// TODO-LIST
//ENDPOINTS FOR CRUD IMPLEMENTATION

// DELETE CURRENT TODOLIST


exports.handler = async (event) => {
    try {
        if (!event.pathParameters || !event.pathParameters.id_Note) return responses._400({ message: "Request has no id" });

        const idNote = event.pathParameters.id_Note;

        const noteDB = await Dynamo.delete(idNote, tableName1);

        return responses._204(noteDB);

    } catch (error) {
        console.log(error);
        return responses._400({ errorMessage: error.message });
    }
};
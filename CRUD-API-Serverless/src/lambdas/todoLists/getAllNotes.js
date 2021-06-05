'use strict';
const responses = require("../../common/API-Responses");
const Dynamo = require('../../common/Dynamo');
const tableName1 = process.env.myDynamoDBTable1;
// TODO-LIST
//ENDPOINTS FOR CRUD IMPLEMENTATION

// GET ALL TODOLISTS

exports.handler = async (event) => {
    try {

        const notesDB = await Dynamo.getAll(tableName1);

        return responses._200(notesDB);

    } catch (error) {
        console.log(error);
        return responses._400({ errorMessage: error.message });
    }
};
"use strict";
const responses = require("../common/API-Responses");
const Dynamo = require("../common/Dynamo");
// TODO-LIST
//ENDPOINTS FOR CRUD IMPLEMENTATION

// UPDATE CURRENT TODOLIST

exports.handler = async (event) => {
  try {
    if (!event.pathParameters || !event.pathParameters.id_Note)
      return responses._400({ message: "Request has no id" });

    if (!event.body) return responses._400({ message: "Request has no body" });

    const idNote = event.pathParameters.id_Note;
    const updatedNote = JSON.parse(event.body);

    const updatedNoteDB = await Dynamo.update(
      idNote,
      updatedNote,
      process.env.myDynamoDBTable
    );

    return responses._200(updatedNoteDB);
  } catch (error) {
    console.log(error);
    return responses._400({ errorMessage: error.message });
  }
};

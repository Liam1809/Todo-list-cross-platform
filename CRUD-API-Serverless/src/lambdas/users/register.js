'use strict';
const responses = require("../../common/API-Responses");
const Dynamo = require('../../common/Dynamo');
const tableName2 = process.env.myDynamoDBTable2;

// REGISTER NEW USER

exports.handler = async (event, context, callback) => {
    try {
        if (!event.body) return responses._400({ message: "Request has no body" });

        const newUser = JSON.parse(event.body);

        // compare password and confirmPassword
        if (newUser.password !== newUser.confirmPassword) return responses._400({ message: " Password not exact" });

        const userDB = await Dynamo.register(newUser, tableName2);

        // event.userID = userDB.id_User;

        return responses._201(userDB);
    } catch (error) {
        console.log(error);
        return responses._400({ errorMessage: error.message });
    }
};
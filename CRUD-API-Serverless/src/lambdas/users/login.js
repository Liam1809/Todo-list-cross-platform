'use strict';
const responses = require("../../common/API-Responses");
const Dynamo = require('../../common/Dynamo');
const jwt = require("jsonwebtoken");

// LOGIN USER

exports.handler = async (event) => {
    try {
        if (!event.body) return responses._400({ message: "Request has no body" });

        const currentUser = JSON.parse(event.body);

        const userDB = await Dynamo.login(currentUser, process.env.myDynamoDBTable2);

        if (userDB.message1) return responses._400({ message: userDB.message1 });

        if (userDB.message2) return responses._400({ message: userDB.message2 });
        // sign jwt token
        const token = jwt.sign({ name: userDB.userName, userId: userDB.id_User }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return responses._201({ profile: { token: token, name: userDB.userName }, message: "successfull signed in" });
    } catch (error) {
        console.log(error);
        return responses._400({ errorMessage: error.message });
    }
};
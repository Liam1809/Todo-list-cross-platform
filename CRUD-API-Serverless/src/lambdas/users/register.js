'use strict';
const responses = require("../../common/API-Responses");
const Dynamo = require('../../common/Dynamo');
const jwt = require("jsonwebtoken");


// REGISTER NEW USER

exports.handler = async (event) => {
    try {
        if (!event.body) return responses._400({ message: "Request has no body" });

        const newUser = JSON.parse(event.body);

        // compare password and confirmPassword
        if (newUser.password !== newUser.confirmPassword) return responses._400({ message: " Password not exact" });

        const userDB = await Dynamo.register(newUser, process.env.myDynamoDBTable2);

        if (userDB.message) return responses._400({ message: userDB.message });
        // sign jwt token
        const token = jwt.sign({ name: userDB.userName, userId: userDB.id_User }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return responses._201({ profile: { token: token, name: userDB.userName }, message: "successfull registered" });
    } catch (error) {
        console.log(error);
        return responses._400({ errorMessage: error.message });
    }
};
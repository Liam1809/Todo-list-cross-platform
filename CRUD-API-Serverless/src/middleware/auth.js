'use strict';
const responses = require("../../common/API-Responses");
const jwt = require("jsonwebtoken");


exports.handler = async (event, context, callback) => {
    try {
        const token = event.authorizationToken.split(' ')[1];

        // check if token valid
        if (!token) return generatePolicy('undefined', 'Deny', event.methodArn);

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedData && !decodedData.userName) return generatePolicy(decodedData.userName, 'Allow', event.methodArn);

        return generatePolicy('undefined', 'Deny', event.methodArn);
    } catch (error) {
        console.log(error);
        return responses._400({ errorMessage: error.message });
    }
};


// Policy helper function
const generatePolicy = (principalId, effect, resource) => {
    const authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        const policyDocument = {};
        policyDocument.Version = '2012-10-17';
        policyDocument.Statement = [];
        const statementOne = {};
        statementOne.Action = 'execute-api:Invoke';
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
};
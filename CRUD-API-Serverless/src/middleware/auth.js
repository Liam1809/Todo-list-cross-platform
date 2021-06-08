'use strict';
const responses = require("../common/API-Responses.js");
const jwt = require("jsonwebtoken");


// exports.handler = async (event, context, callback) => {
//     try {
//         const token = event.headers.authorization.split(;);


//         return responses._400({ message: token });

//         // if (!token) return generatePolicy('undefined', 'Deny', event.methodArn);

//         // const decodedData = jwt.verify(token, process.env.JWT_SECRET);

//         // if (!decodedData && !decodedData.userName) return generatePolicy(decodedData.userName, 'Allow', event.methodArn);

//         // return generatePolicy('undefined', 'Deny', event.methodArn);
//     } catch (error) {
//         console.log(error);
//         return responses._400({ errorMessage: error.message });
//     }
// };


// // Policy helper function
// const generatePolicy = (principalId, effect, resource) => {
//     const authResponse = {};
//     authResponse.principalId = principalId;
//     if (effect && resource) {
//         const policyDocument = {};
//         policyDocument.Version = '2012-10-17';
//         policyDocument.Statement = [];
//         const statementOne = {};
//         statementOne.Action = 'execute-api:Invoke';
//         statementOne.Effect = effect;
//         statementOne.Resource = resource;
//         policyDocument.Statement[0] = statementOne;
//         authResponse.policyDocument = policyDocument;
//     }
//     return authResponse;
// };

module.exports.handler = async (event, context) => {

    const token = event.authorizationToken.replace(/Bearer /g, '');

    let decodedJwt = jwt.verify(token, process.env.JWT_SECRET)
    if (typeof decodedJwt.username !== 'undefined' &&
        decodedJwt.username.length > 0) {
        return generatePolicy(decodedJwt.username, 'Allow', event.methodArn)
    }
    generatePolicy('undefined', 'Deny', event.methodArn)

}

// Help function to generate an IAM policy
const generatePolicy = function (principalId, effect, resource) {
    let authResponse = {}

    authResponse.principalId = principalId
    if (effect && resource) {
        let policyDocument = {}
        policyDocument.Version = '2012-10-17'
        policyDocument.Statement = []
        let statementOne = {}
        statementOne.Action = 'execute-api:Invoke'
        statementOne.Effect = effect
        statementOne.Resource = resource
        policyDocument.Statement[0] = statementOne
        authResponse.policyDocument = policyDocument
    }

    return authResponse
}
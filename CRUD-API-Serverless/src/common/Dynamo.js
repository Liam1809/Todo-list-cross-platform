const uuid = require('uuid').v4;
const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    write: async (data, tableName) => {
        const Item = { ...data, id_Note: uuid(), createdAt: new Date().toISOString() };

        const params = {
            TableName: tableName,
            Item: Item,
        };

        await documentClient.put(params).promise();

        return Item;
    },
    getAll: async (tableName) => {

        const params = {
            TableName: tableName
        };

        const data = await documentClient.scan(params).promise();

        if (!data || !data.Items) return null;

        return JSON.stringify(data.Items);
    },
    delete: async (key, tableName) => {

        const params = {
            TableName: tableName,
            Key: {
                id_Note: key
            }
        };

        await documentClient.delete(params).promise();

        return {};
    },
    update: async (key, data, tableName) => {
        const params = {
            TableName: tableName,
            Key: {
                id_Note: key
            },
            UpdateExpression: 'set note = :n',
            ExpressionAttributeValues: {
                ":n": data.note
            },
            ReturnValues: 'ALL_NEW'
        };

        const updatedData = await documentClient.update(params).promise();

        return JSON.stringify(updatedData);
    },
    login: async () => {

    },
    register: async (data, tableName) => {

        // checking user exist
        const queryUserParams = {
            TableName: tableName,
            KeyConditionExpression: '#username = :username',
            ExpressionAttributeNames: {
                '#username': 'userName'
            },
            ExpressionAttributeValues: {
                ':username': data.userName
            }
        };

        const existingUser = await documentClient.query(queryUserParams).promise();

        // if user exist
        if (existingUser.Items.length === 1 && existingUser.Items[0].userName === data.userName) return { message: "USER ALREADY EXISTS" };

        // if user not exist then register
        const Item = {
            "userName": data.userName,
            "id_User": uuid(),
            "password": bcrypt.hashSync(data.password, 2),
            "confirmPassword": bcrypt.hashSync(data.password, 2),
        };

        const params = {
            TableName: tableName,
            Item: Item,
        };

        await documentClient.put(params).promise();

        return Item;
    }
};

module.exports = Dynamo;

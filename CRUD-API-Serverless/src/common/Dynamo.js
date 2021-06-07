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
    login: async (data, tableName) => {
        const existingUser = await checkExistingUser(data, tableName);

        // if user not register
        if (!existingUser) return { message1: "USER NOT REGISTER" };

        // if user exist then login
        const checkPassword = bcrypt.compareSync(data.password, existingUser[0].hashPassword);

        // if password is not matched
        if (!checkPassword) return { message2: "User or password not correct" };

        return {
            "userName": existingUser.userName,
            "id_User": existingUser.id_User
        };
    },
    register: async (data, tableName) => {

        const existingUsers = await checkExistingUser(data, tableName);

        // if user exist
        if (existingUsers.length === 1 && existingUsers[0].userName === data.userName) return { message: "USER ALREADY EXISTS" };

        // if user not exist then register
        const Item = {
            "userName": data.userName,
            "id_User": uuid(),
            "hashPassword": bcrypt.hashSync(data.password, 2)
        };

        const params = {
            TableName: tableName,
            Item: Item,
        };

        await documentClient.put(params).promise();

        return Item;
    }
};

const checkExistingUser = async (data, tableName) => {
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

    return (await documentClient.query(queryUserParams).promise()).Items;
};

module.exports = Dynamo;

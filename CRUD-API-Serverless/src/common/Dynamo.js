const uuid = require("uuid").v4;
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
  write: async (data, tableName) => {
    const Item = {
      ...data,
      id_Note: uuid(),
      createdAt: new Date().toISOString(),
    };

    const params = {
      TableName: tableName,
      Item: Item,
    };

    await documentClient.put(params).promise();

    return Item;
  },
  getAll: async (tableName) => {
    const params = {
      TableName: tableName,
    };

    const data = await documentClient.scan(params).promise();

    if (!data || !data.Items) return null;

    return data.Items;
  },
  delete: async (key, tableName) => {
    const params = {
      TableName: tableName,
      Key: {
        id_Note: key,
      },
    };

    await documentClient.delete(params).promise();

    return {};
  },
  update: async (key, data, tableName) => {
    const params = {
      TableName: tableName,
      Key: {
        id_Note: key,
      },
      UpdateExpression: "set note = :n",
      ExpressionAttributeValues: {
        ":n": data.note,
      },
      ReturnValues: "ALL_NEW",
    };

    const updatedData = await documentClient.update(params).promise();

    return updatedData.Attributes;
  },
};

module.exports = Dynamo;

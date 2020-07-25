const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
});
const tableName = 'Cards';

exports.handler = async (event) => {
  let response = '';
  try {
    const params = {
      TableName: tableName,
    };
    const cards = await documentClient.scan(params).promise();
    response = {
      statusCode: 200,
      body: JSON.stringify(cards),
    };
  } catch (error) {
    console.error(error);
    response = {
      statusCode: 500,
      body: JSON.stringify({ 'Message: ': error }),
    };
  }
  return response;
};

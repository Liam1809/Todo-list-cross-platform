const responseGenerator = (statusCode = 400, data = {}) => {
    return {
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*'
        },
        statusCode,
        body: JSON.stringify(data)
    }
};

export const responsses = {
    _200: (data) => responseGenerator(200, data),
    _203: (data) => responseGenerator(203, data),
    _204: (data) => responseGenerator(204, data),
    _400: (data) => responseGenerator(400, data),
    _401: (data) => responseGenerator(401, data),
    _403: (data) => responseGenerator(403, data)
};
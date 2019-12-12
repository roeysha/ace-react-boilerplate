export class APIError extends Error {
    constructor(response, body) {
        const req = response.request;
        super(`${req.method} ${req.href} responsed with ${response.statusCode}`);
        this.name = "APIError";
        this.statusCode = response.statusCode;
        this.response = response;
        this.body = body;
    }
}

export function requestCallback(resolve, reject) {
    return (err, response, body) => {
        if (err || response.statusCode < 200 || response.statusCode >= 300) {
            reject(err || new APIError(response, body));
        }
        else {
            resolve(body);
        }
    }
}

// Usage Example:
// export function createVersion(client, version) {
//     return new Promise((resolve, reject) => client.post({
//         url: '/rest/api/3/version',
//         body: version,
//         json: true
//     }, requestCallback(resolve, reject)));
// }
const server = require('server.js');

const Service = function () {



};


Service.prototype.init = async function () {
console.log('init');
await server.startServer();
await server.addRoutes()

}

let service = new Service();
service.init();
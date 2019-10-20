const express = require('express');
const request = require('request-promise-native');
const bodyParser = require('body-parser');
const quadrantTool = require('./src/quadrants/quadranttool.js');
const userUtil = require('./src/users/userutil.js');
const modisImporter = require('./src/fires/fires-importer.js');
const userFireImporter = require('./src/fires/fire-upload-util.js')
const jsonParser = bodyParser.json();

const app = express();

const Server = function () {

}

Server.prototype.startServer = function () {
console.log('startServer');
this.serverHandler = app.listen(2424, function () {

});
console.log('server is listening on port:' + 2424);

}

Server.prototype.addRoutes = function (){

    app.post('/user', jsonParser, async function(req, res, next) {
        try {
        let quadrant = quadrantTool.getQuadrantByLocation(req.body.location,  function (data){
            let user =  userUtil.createUser(req.body, data);
            userUtil.saveUser(user, function(){
                res.status(200).json(data);
            });
                        
        });
    }
        catch (e){
            res.status(500).send(e.message);
        }
    });
   
      
    app.post('/modisFires', jsonParser, async function(req, res, next) {
        try {
       modisImporter.convertModisToMatoi(req.body,  function (){
            
           res.status(201).send('fires imported');
            });
                        
           }
        catch (e){
            res.status(500).send(e.message);
        }
    });
   



   app.post('/userFire', jsonParser, async function(req, res) {
    try {
        userFireImporter.convertUserFireToMatoi(req.body,  function (){
             
            res.status(201).send('user fire imported');
             });
                         
            }
         catch (e){
             res.status(500).send(e.message);
         }
});

};







let server = new Server();
module.exports = server;

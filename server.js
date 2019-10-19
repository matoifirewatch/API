const express = require('express');
const request = require('request-promise-native');
const bodyParser = require('bodyParser');

const app = require('express');

Server.prototype.startServer = function () {
console.log('startServer');
this.serverHandle = app.listen(2424, function () {

});
console.log('server is listening on port:' + 2424);

}

Server.addRoutes = function (){

    app.post('/user', bodyParser, async function(req, res) {
        let quradrant = quadrantUtil.getQuadrantByLocation();//get Quadrant
        let user = await userUtil.createUser(req.body, quadrant)//createUser
        let info = user
        res.status(200).json(user);
   });


   app.post('/fire', bodyParser, async function(req, res) {
       try {
    let isValidFire = await fireUtil.isExistingFire(req.body); 
    if (isValidFire){
    let exsitingFire = await fireUtil.getExistingFire(req.body);//get Quadrant
    if (existingFire){

    }
    //created
    res.status(201);
}

else {
    //bad request
    res.status(400)
}
       } catch (e){
           request.status(500).send('Internal Server Error');
       }
});


} 


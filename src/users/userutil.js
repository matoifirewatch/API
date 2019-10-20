const _ = require('lodash');
const client = require ('../db.js');


const UserUtil = function () {


};

UserUtil.prototype.createUser = async function (userInfo, quadrant){

    let userClone = _.cloneDeep(userInfo);
    userClone.quadrantInfo = quadrant;
    return userClone;

}


UserUtil.prototype.createUser = async function (userInfo, quadrant){

    let userClone = _.cloneDeep(userInfo);
    userClone.quadrantInfo = quadrant;
    return userClone;

}


UserUtil.prototype.findUsersByQuadrant =  function (fireQuadrantId){

    
        let collection = client.db("Matoi").collection("users");
        collection.find({quadrantId: fireQuadrantId}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            client.close();
            callback(result);
            
           
         
      });
    };


UserUtil.prototype.saveUser = async function (userInfo){

  
        let collection = client.db("Matoi").collection("users");
        let result = collection.insertOne(userInfo, (function(err, result) {
            if (err) throw err;
            console.log(result);
            client.close();
            callback(result);
         
         
      }));
    
   

};




let userUtil = new UserUtil();

module.exports = userUtil;
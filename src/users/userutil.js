const _ = require('lodash');
const client = require ('../db.js');


const UserUtil = function () {


};

UserUtil.prototype.createUser =  function (userInfo, quadrant){

    let userClone = _.cloneDeep(userInfo);
    userClone.quadrantInfo = quadrant;
    userClone.quadrantId = quadrant.quadrantId;
    userClone.id = userInfo.username;
    return userClone;

}


UserUtil.prototype.saveUser =  function (userInfo, callback){

    client.connect(err => {
        let collection = client.db("Matoi").collection("users");
        collection.insertOne(userInfo, {}, (function(err, result) {
            if (err) throw err;
            console.log(result);
            client.close();
            callback();
           
         
      }));
    
    });

}

let userUtil = new UserUtil();

module.exports = userUtil;
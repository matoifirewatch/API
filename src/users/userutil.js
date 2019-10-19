const _ = require('lodash');
const client = require ('../db.js');


const UserUtil = function () {


};

UserUtil.prototype.createUser = async function (userInfo, quadrant){

    let userClone = _.cloneDeep(userInfo);
    userClone.quadrantInfo = quadrant;
    return userClone;

}


UserUtil.prototype.saveUser = async function (userInfo){

    client.connect(err => {
        const collection = client.db("Matoi").collection("users");
        const result = collection.insertOne(userInfo, (function(err, result) {
            if (err) throw err;
            console.log(result);
            client.close();
            callback(result);
           
         
      });
    
    });

}

let userUtil = new UserUtil();

module.exports = userUtil;
const _ = require('lodash');
const client = require ('../db.js');



const FiresUtil = function () {


};

FiresUtil.prototype.findExistingMatoiFire = async function (location, timestamp, callback){
  
    const collection = client.db("Matoi").collection("matoiFires");
    collection.find({
        location: {
            $near: {
                $geometry: location,
                $maxDistance: 5000
            }
        
        }
    }).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        client.close();
        callback(result);


    });

 

};

FiresUtil.prototype.createNewFire = async function (body, type, callback){
  var that = this;
  let newFire = null;
    if (type === 'Modus'){
        newFire = that.createNewModusFire(body);
    }
    else if (type === 'User'){
        newFire = that.createNewUserFire(body);
    }

    return newFire;
};

FiresUtil.prototype.insertMatoiFire = function (matoiFire) {

    var that = this;
    let collection = client.db("Matoi").collection("matoiFires");
    collection.insertOne(matoiFire,  (function(err, result) {
        if (err) throw err;
        console.log(result);
        client.close();
        callback();
     
     
  }));


}



let firesUtil = new FiresUtil();

module.exports = firesUtil;
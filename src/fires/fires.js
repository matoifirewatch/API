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



let firesUtil = new FiresUtil();

module.exports = firesUtil;
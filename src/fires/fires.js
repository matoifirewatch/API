const _ = require('lodash');
const client = require ('../db.js');
const uuidv1 = require('uuid/v1')



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
    if (type === 'Modis'){
        newFire = that.createNewModisFire(body);
    }
    else if (type === 'User'){
        newFire = that.createNewUserFire(body);
    }

    that.insertMatoiFire(newFire);
};


FiresUtil.prototype.createNewModisFire = function (body){

    let location = {
        type: "Point",
        coordinates: [body.longitude, body.latitude],
    }

    let matoiFire = {};
    modusData = body;
    matoiFire.id = uuid();
    matoiFire.location = location;
   
    matoiFire.date = body.acq_date;
    matoiFire.time = body.acq_time;
    matoiFire.liveReports = [];
    matoiFire.postReports = [];
    matoiFire.modisLocation = location;
    matoiFire.reportLocations = [];
    matoiFire.isCorroborated = false;
    matoiFire.liveCorroboration = false;
    matoiFire.postCorroboration = false;
    //TODO ADD QUADRANT IDE BASED ON LOCATION
    // matoiFire.quadrantId = quadrantId;
    return matoiFire;

}

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
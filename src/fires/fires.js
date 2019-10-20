const _ = require('lodash');
const client = require ('../db.js');
const uuid = require('uuid/v1')
const quadrantsUtil = require('../quadrants/quadranttool.js');



const FiresUtil = function () {


};

FiresUtil.prototype.findExistingMatoiFire = async function (location, callback){
  
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
  


    if (type === 'modis'){
    that.createNewModisFire(body, function (fire){
            that.insertMatoiFire(fire);
        });
    }
    else if (type === 'user'){
        newFire = that.createNewUserFire(body, function (fire){
            that.insertMatoiFire(fire);
        });
    }
  
};


FiresUtil.prototype.createNewModisFire = function (body, callback){

    let location = {
        type: "Point",
        coordinates: [parseFloat(body.longitude), parseFloat(body.latitude)],
    }

    quadrantsUtil.getQuadrantByLocation(location, function (quadrant) { 

    let matoiFire = {};
    matoiFire.NASAData = body;
    matoiFire.id = uuid();
    matoiFire.location = location;
   matoiFire.date = body.acq_date;
    matoiFire.time = body.acq_time;
    matoiFire.liveReports = [];
    matoiFire.postReports = [];
    matoiFire.falsePositiveReports = [];
    matoiFire.modisLocation = location;
    matoiFire.reportLocations = [];
    matoiFire.isCorroborated = false;
    matoiFire.liveCorroboration = false;
    matoiFire.postCorroboration = false;
    matoiFire.liveRejection = false;


    matoiFire.quadrantId = quadrant[0].quadrantId;
    callback(matoiFire);

    });

}


FiresUtil.prototype.createNewUserFire = function (body, callback){

    let location = body.location;
    quadrantsUtil.getQuadrantByLocation(location, function (quadrant) { 

    let matoiFire = {};
    matoiFire.NASAData = null;
    matoiFire.id = uuid();
    matoiFire.location = location;
    matoiFire.date = body.date;
    matoiFire.time = body.time;
    matoiFire.liveReports = [];
    matoiFire.postReports = [];
    matoiFire.falsePositiveReports = [];
    matoiFire.modisLocation = null;
    matoiFire.reportLocations = [];
    matoiFire.isCorroborated = false;
    matoiFire.liveCorroboration = false;
    matoiFire.postCorroboration = false;
    matoiFire.liveRejection = false;

    matoiFire.quadrantId = quadrant[0].quadrantId;


    if (!body.isConfirmation){
        matoiFire.liveReports.push(body);
        matoiFire.liveCorroboration = true;
    }
    else  {
        if (body.seesSmoke || body.seesFire){
            matoiFire.liveReports.push(body);
            matoiFire.liveCorroboration = true;
        }
        else if (body.seesEvidenceOfRecentFire){
            matoiFire.postReports.push(body);
            matoiFire.postCorroboration = true;
        }
        else if (body.seesNoFireEvidence) {
            matoiFire.falsePositiveReports.push(body);
            matoiFire.liveRejection = true
        }

    }
    matoiFire.reportLocations.push(location);
 

    callback(matoiFire);

    });

}


FiresUtil.prototype.insertMatoiFire = function (matoiFire) {

    var that = this;
    let collection = client.db("Matoi").collection("matoiFires");
    collection.insertOne(matoiFire,  (function(err, result) {
        if (err) throw err;
        console.log(result);
        client.close();
        // callback();
     
     
  }));


}



let firesUtil = new FiresUtil();

module.exports = firesUtil;
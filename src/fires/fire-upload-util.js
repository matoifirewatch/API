const _ = require('lodash');
const client = require ('../db.js');
const firesUtil = require('./fires.js');


const FireUploadUtil = function () {


};

FireUploadUtil.prototype.uploadUserFire = async function (uploadBoady){

   var that = this;
   firesUtil.findExistingMatoiFire(location, timestamp, function (existingFire){
    if (existingFire){
       
        firesUtil.addDataToExistingFire(existingFire, update);
    } 
    else {
        firesUtil.createNewFire(update, true);
    }
   });

}



let fireUploadUtil = new FireUploadUtil();

module.exports = fireUploadUtil;
const _ = require('lodash');
const client = require ('../db.js');
const firesUtil = require('./fires.js');



const ModisImporter = function () {


};

ModisImporter.prototype.convertModisToMatoi = async function (uploadBoady){

   var that = this;
   that.findExistingMatoiFire(location, timestamp function (existingFire){
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
const _ = require('lodash');
const client = require ('../db.js');
const firesUtil = require('./fires.js');



const ModisImporter = function () {


};

ModisImporter.prototype.convertModisToMatoi = async function (uploadBody, callback){

   var that = this;
   firesUtil.findExistingMatoiFire(location, timestamp, function (existingFire){
    if (existingFire){
       let updateType = 'modis';
        firesUtil.addDataToExistingFire(existingFire, uploadBody, updateType, function () {
            callback();
        });
    } 
    else {
        firesUtil.createNewFire(uploadBody, updateType, function (){
            callback();
        });
    }
   });

}



let firesUtil = new firesUtil();

module.exports = firesUtil;
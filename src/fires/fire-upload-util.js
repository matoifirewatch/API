const _ = require('lodash');
const client = require ('../db.js');
const firesUtil = require('./fires.js');


const FireUploadUtil = function () {


};

FireUploadUtil.prototype.convertUserFireToMatoi = async function (uploadBody){

   var that = this;
   var type = 'user';
   firesUtil.findExistingMatoiFire(uploadBody.location, function (existingFire){
    if (existingFire){
    console.log(exsitingFire);
        // firesUtil.addDataToExistingFire(existingFire, update);
    } 
    else {
        firesUtil.createNewFire(uploadBody, type );
    }
   });

}



let fireUploadUtil = new FireUploadUtil();

module.exports = fireUploadUtil;
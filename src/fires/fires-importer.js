const _ = require('lodash');
const client = require ('../db.js');
const firesUtil = require('./fires.js');



const ModisImporter = function () {


};

ModisImporter.prototype.convertModisToMatoi = async function (modisFires, callback){

   var that = this;

   let updateType = 'modis';
   modisFires.forEach(function (body){


    firesUtil.findExistingMatoiFire(uploadBody.location, function (existingFire){
        if (existingFire && existingFire[0]){
        console.log(exsitingFire);
            firesUtil.addDataToExistingFire(existingFire[0], uploadBody, type);
        } 
        else {
        firesUtil.createNewFire(body, updateType, function (){
           
        });
    }
    });

});
//TODO AWAIT ALL SUCCESSFUL IMPORTS THEN CALL
 callback();

};


let modisImporter = new ModisImporter();

module.exports = modisImporter;
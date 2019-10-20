const _ = require('lodash');
const client = require ('../db.js');
const firesUtil = require('./fires.js');



const ModisImporter = function () {


};

ModisImporter.prototype.convertModisToMatoi = async function (modisFires, callback){

   var that = this;

   let updateType = 'modis';
   modisFires.forEach(function (body){


//    firesUtil.findExistingMatoiFire(location, timestamp, function (existingFire){
//     if (existingFire){
//        let updateType = 'modis';
//         firesUtil.addDataToExistingFire(existingFire, uploadBody, updateType, function () {
//             callback();
//         });
//     } 
//     else {
        firesUtil.createNewFire(body, updateType, function (){
            callback();
        });
//     }
//    });

});

};


let modisImporter = new ModisImporter();

module.exports = modisImporter;
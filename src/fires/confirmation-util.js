const _ = require('lodash');
const client = require('../db.js');
const usersUtil = require('users/usersutil.js');



const ConfirmationUtil = function () {


}

let confirmationUtil = new confirmationUtil();
module.exports = confirmationUtil;



ConfirmationUtil.prototype.requestFireConfirmations = function (fires, callback) {
var that = this;
// find new fires
//find users in fire quadrant
fires.forEach(function (fire) {
        usersUtil.findUsersInQuadrant(fire.quadrantId, function (users) {
                users.forEach(function (user) {
                        let fireAlert = that.createFireAlert(fire);
                        usersUtil.sendAlert(user, fireAlert);
                        //send back to fires importer rest endpoint
                        callback(users, fireAlert);
                    });
                });

        });
};

ConfirmationUtil.prototype.createFireAlert = function (fire) {
console.log('createFireAlert');

let text = 'Matoi needs your help with a fire in your patch.  Please open the link';
return text;

};




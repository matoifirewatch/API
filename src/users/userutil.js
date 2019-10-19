const _ = require('lodash');

const UserUtil = function () {


};

UserUtil.prototype.createUser = async function (userInfo, quadrant){

    let userClone = _.cloneDeep(userInfo);
    userClone.quadrantInfo = quadrant;
    return userClone;

}

let userUtil = new UserUtil();

module.exports = userUtil;
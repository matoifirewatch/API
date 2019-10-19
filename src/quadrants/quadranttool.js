
const grid = require('@turf/square-grid');
const bboxTurf = require('@turf/bbox');
const polygon = require('./polygon.json');
const _ = require('lodash');
const db = require ('../db.js');
const fs = require('fs');

const QuadrantTool = function () {
};


QuadrantTool.prototype.init = function () {
    var that = this;
     this.polygon = polygon.features[0];
     this.quadrants = that.createQuadrants();
     var json = JSON.stringify(this.quadrants);  
     return JSON.stringify(json);

};

QuadrantTool.prototype.createQuadrants = function () {
console.log('createQuadrants');

let bbox = bboxTurf.default(this.polygon);
let options = {units: 'miles'};
let quadrants = grid.default(bbox, 10, options);
let quadrantsClone = _.cloneDeep(quadrants);
let numberedQuadrants = _.map(quadrants.features, function (x, i){
    x.quadrantId = i;
    return x;
});
quadrantsClone.features = numberedQuadrants;
return numberedQuadrants;



};

QuadrantTool.prototype.getQuadrantByPoint = function (point) {

    let quadrant = null;
    let polygons = this.quadrants;



}


QuadrantTool.prototype.getQuadrantByLocation = function (coordinates, callback){
console.log('getQuadrantByLocation');

db.connect(err => {
    const collection = client.db("matoi").collection("quadrants");
    const result = collection.find({});

    // perform actions on the collection object
    client.close();
  });

};


let quadrantTool = new QuadrantTool();



module.exports = quadrantTool;

const grid = require('@turf/square-grid');
const bboxPolygon = require('@turf/bbox-polygon');
// const db = require ('db.js');
const fs = require('fs');

const QuadrantTool = function () {
};


QuadrantTool.prototype.init = function () {

     this.polygon = fs.readFileSync('./polygon.json');
     this.quadrants = that.getQuadrants();
    
     return this.quadrants;

};

QuadrantsTool.prototype.createQuadrants = function () {
console.log('createQuadrants');

let bbox = bboxPolygon(this.polygon);
return bbox;



};

QuadrantTool.prototype.getQuadrantByPoint = function (point) {

    let quadrant = null;
    let polygons = this.quadrants;



}

let quadrantTool = new QuadrantTool();



module.exports = quadrantTool;
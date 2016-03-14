/**
 * SystemsController
 *
 * @description :: Server-side logic for managing systems
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var request = require('request');

module.exports = {
    available: function (req, res) {
      return res.send("OK");
    },

    monster: function (req, res){
      return request('http://dnmonster:8080/monster/'+req.param('name')+'?size=80').pipe(res);
    }
};

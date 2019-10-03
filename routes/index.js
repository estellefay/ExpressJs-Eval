var express = require('express');
var router = express.Router();
var mongo = require('../bin/mongo');
const ObjectId = require('mongodb').ObjectId;

/* GET home page. */
router.get('/', function(req, res, next) {
  mongo.getInstance().collection('contacts').find().limit(50).toArray((err, contacts) => {
    nbContact = contacts.length;
    res.render('index', { title: 'Annuaire Online', contacts : contacts, nbContact : nbContact,});
  })
});

module.exports = router;

var express = require('express');
var router = express.Router();
var mongo = require('../bin/mongo');
const ObjectId = require('mongodb').ObjectId;

/* GET home page. */
router.get('/', function(req, res, next) {
  // Obtenir tous les contact -> @TODO ordre alphabétique
  mongo.getInstance().collection('contacts').find().sort({'nom': 1}).toArray(function(err, contacts) {
    nbContact = contacts.length;
    // Obtenir les 3 dernier contacts
  mongo.getInstance().collection('contacts').find().sort({_id:-1}).limit(3).toArray(function(err, contactsLast) {  
    res.render('index', { title: 'Annuaire Online', contacts : contacts, nbContact : nbContact, contactsLast : contactsLast});
    })
  });
});




/* GET contact page. */
router.get('/contactDetail/:id', function(req, res, next) {

  mongo.getInstance().collection('contacts').find({_id: ObjectId( req.params.id )},).toArray(function(err, result) {
    if (err) throw err;
    else {
    res.render('detailContact', { title: result[0].nom, contact : result[0] });
    }
  });
});

/* GET contact page. */
router.get('/updateContact/:id', function(req, res, next) {

  mongo.getInstance().collection('contacts').find({_id: ObjectId( req.params.id )},).toArray(function(err, result) {
    if (err) throw err;
    else {
    res.render('updateContact', { title: result[0].nom, contact : result[0] });
    }
  });
});
module.exports = router;

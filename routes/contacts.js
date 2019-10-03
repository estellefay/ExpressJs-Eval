var express = require('express');
var router = express.Router();
const app = express();

const { check, validationResult } = require('express-validator');
var mongo = require('../bin/mongo');

const ObjectId = require('mongodb').ObjectId;

app.use(express.json());

/* Obtenir la liste de tous les contacts par ordre alphabétique. */
router.get('/', function(req, res, next) {
  mongo.getInstance().collection('contacts').find().sort( { nom: 1 } ).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);

      // obtenir le nombre total de contact
      nbContact = result.length;
      res.send({ok: true, result : result, nbContact : nbContact})
  });
});


// Création un contact
router.post('/', function(req, res) { 
//console.log(req.body.email);

  // tableau avec les emails
  const email = [];
  // Tableau avec les numero de telephone
  const telephone = [];

  req.body.email.forEach(function (item) {
    email.push(item);
   })
  req.body.telephone.forEach(function (item) {
    telephone.push(item);
  })
  // Ajouter un contact
  mongo.getInstance().collection('contacts').insertOne(
    // Ajouter ces infos
    {
      nom: req.body.nom,
      prenom : req.body.prenom,
      email : email,
      telephone: telephone,
      description : req.body.description,
      avatar : req.body.avatar,
      date : new Date(),
    },
    (err) => {
      // Si erreur 
      if(err) throw err;
      // Renvoyer la réponse ok et le result
      res.send({ok: true})
  })
});


/* Obtenir un CONTACT en fonction de son ID */
router.get('/:id', function(req, res, next) {
  // Vérifier que l'ont passe un ID
  if (req.params.id.length != 24) {
    next();
  }
  mongo.getInstance().collection('contacts').find({_id: ObjectId( req.params.id )},).toArray(function(err, result) {
    if (err) throw err;
    else {
      res.send({ok: true, result})
    }
  });
});


/* modifier un contact */
router.put('/:id', function(req, res) {
  let updateContact = {
    ...req.body,
  };
  mongo.getInstance().collection('contacts').updateOne({ _id : ObjectId( req.params.id ) },
    { $set : updateContact },
    (err, result) => {
      if (err) throw err;
      else {
        res.send({ok:true, result : result});
    }
  });      
});


// Supprimer un contact
router.delete('/:id', function(req, res) {
  mongo.getInstance().collection('contacts').deleteOne(
    // Filtre
    { _id : ObjectId(req.params.id) },
    (err, result) => {
      if (err) throw err;
      res.send({ok:true, result : result});
    });      
});




module.exports = router;

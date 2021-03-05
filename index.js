//const { urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const Team = require('./model/team.model');
const bodyParser = require('body-parser');
const uri = "mongodb+srv://nicolas:smith@cluster0.cee1t.mongodb.net/Cluster0?retryWrites=true&w=majority";

let app = express();

let promise = mongoose.connect(uri, {useNewUrlParser: true});

promise.then(() => {
  console.log('db connected');
  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
});

app.use('/pages', express.static('./client/pages'));
app.use('/script', express.static('./client/script'));
app.use('/style', express.static('./client/style'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**
 * acceder a la page principale
 */
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

/**
 * creer une resource
 */
app.post('/api/team', (req, res) => {
  let newTeam = new Team(req.body);

  newTeam.save((err, obj) => {
    if(err) {
      console.log(err);
      return res.send(500);
    }

    res.send(obj);
  });
});
 
/**
 * recuperer toutes les resources
 */
app.get('/api/team', (req, res) => {
  Team.find({}, (err, obj) => {
    if(err) {
      console.log(err);
      return res.send(500);
    }
    return res.send(obj);
  });
});

/**
 * recuperer une seule resource par son id
 */
app.get('/api/team/:id', (req, res) => {
  Team.findOne({_id: req.params.id}, (err, obj) => {
    if(err) {
      console.log(err);
      return res.send(500);
    }
    return res.send(obj);
  });
});

/**
 * modifier une resource
 */
app.put('/api/team/:id', (req, res) => {
  Team.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}, (err, obj) => {
    if(err) {
      console.log(err);
      return res.send(500);
    }
    return res.send(obj);
  });
});

/**
 * supprimer une resource
 */
app.delete('/api/team/:id', (req, res) => {
  Team.deleteOne({_id: req.params.id}, (err, obj) => {
    if(err) {
      console.log(err);
      return res.send(500);
    }
    return res.sendStatus(200);
  });
});
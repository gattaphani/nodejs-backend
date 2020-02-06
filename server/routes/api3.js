const express = require('express');

const adUnitRoutes = express.Router();


// Require AdUnit model in our routes module
const AdUnit = require('../../models/schema3');


// post route
adUnitRoutes.route('/add').post(function (req, res) {
  let adUnit = new AdUnit({
    unit_name: req.body.unit_name,
    unit_price: req.body.unit_price

  });

  adUnit.save()
    .then(adunits => {
      res.status(200).json({ 'adUnit': 'AdUnit is added successfully', adunits });
    })
    .catch(err => {
      res.status(400).send("unable to save to database", err);
    });
});



//get 
adUnitRoutes.route('/get').get(function (req, res) {

  AdUnit.find(function (err, adUnits) {
    if (err) {
      console.log(err);
    }
    else {
      res.status(200).json(adUnits);
      console.log(adUnits);

    }
  });
});

// edit route
adUnitRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  AdUnit.findById(id, function (err, adUnit) {
    if (err) {
      console.log(err);
    }
    else {
      res.status(200).json(adUnit);
      console.log(adUnit);

    }
  });
});

//  Defined update route
adUnitRoutes.route('/update/:id').put(function (req, res) {
  AdUnit.findById(req.params.id, function (err, adUnit) {
    if (!adUnit)
      console.log('Could not load Document', err);
    else {
      adUnit.unit_name = req.body.unit_name;
      adUnit.unit_price = req.body.unit_price;

      adUnit.save().then(adUnit => {
        res.json(adUnit);
      })
        .catch(err => {
          res.status(400).send("unable to update the database", err);
        });
    }
  });
});

// Defined delete | remove | destroy route
adUnitRoutes.route('/delete/:id').delete(function (req, res) {
  AdUnit.findByIdAndRemove({ _id: req.params.id }, function (err, adUnit) {
    if (err)
      res.json(err);
    else
      res.json(adUnit);
  });
});

module.exports = adUnitRoutes;
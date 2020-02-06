const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user2');
const AdUnit = require('../../models/user2');

router.post('/signup', function (req, res) {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      return res.status(500).json({
        error: err
      });

    }
    else {
      const user = new User({
        // _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash
      });
      user.save().then(function (response) {
        console.log(response);
        res.status(200).json({
          message: 'New user has been created',
          result: response
        });
      }).catch(error => {
        res.status(500).json({
          error: error
        });
      });
    }
  });
});

router.post('/signin', function (req, res) {
  User.findOne({
    email: req.body.email,
  })
    .exec()
    .then(function (user) {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        console.log(user)

        if (err) {
          console.log(err)
          return res.status(401).json({
            message: 'Unauthorized Access',
          });
        }

        if (result) {
          const JWTToken = jwt.sign({
            email: user.email,
            _id: user._id
          },
            'secret',
            {
              expiresIn: '2h'
            });
          return res.status(200).json({
            success: 'Welcome to the JWT Auth',
            token: JWTToken,
            email: user.email,
            _id: user._id
          });
        }
        return res.status(401).json({
          failed: 'Unauthorized Access'
        });
      });
    })

    .catch(error => {
      console.log(error)
      res.status(500).json({
        error: error,
        message:"password null"
      });
     
     

    });
});

router.get('/getbyid/:id', function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user) {
    if (err) {
      console.log(err);
    }
    else {
      res.status(200).json(user);
      console.log(user);

    }
  });
})




const adUnitRoutes = express.Router();
// post route
router.post('/add',function (req, res) {
  let adUnit = new AdUnit({
    unit_name: req.body.unit_name,
    unit_price: req.body.unit_price

  });

  adUnit.save()
    .then(adunits => {
      res.status(200).send(adunits);
    })
    .catch(err => {
      res.status(400).send(err);
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


module.exports = router;
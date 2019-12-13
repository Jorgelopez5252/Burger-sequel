var express = require("express");

var router = express.Router();

// Import the model 
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  console.log("get route hit");
  db.Burger.findAll().then( function(data) {

   
    var hbsObject = {
      burgers: data
    };
  
    
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {

  db.Burger.create({
    name: req.body.name,
    devoured: req.body.devoured
  }).then(function (result) {
    console.log(result);
    res.redirect("/");

  });

});

router.put("/api/burgers/:id", function(req, res) {
  console.log(req.body);
  console.log(req.params.id);
  db.Burger.update(
    {
    devoured: req.body.devoured
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(function(result) {
    console.log(result);
   res.json(result)
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  

  db.Burger.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(result) {
    console.log(result);
 res.json(result);
  })
});

// Export routes for server.js to use.
module.exports = router;

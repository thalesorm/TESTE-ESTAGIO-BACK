module.exports = app => {
    const enquetes = require("../controllers/enquete.controllers.js");
    const option = require("../controllers/option.controllers.js");
    const vote = require("../controllers/vote.controllers.js")

    var router = require("express").Router();
  
    // Create a new enquete
    router.post("/", enquetes.create);
    router.post("/option", option.create);
    router.post("/vote", vote.create);
  
    // Retrieve all enquetes
    router.get("/", enquetes.findAll);
  
    // Retrieve all published enquetes
    router.get("/status", enquetes.findAllStatus);
  
    // Retrieve a single enquete with id
    router.get("/:id", enquetes.findOne);

    router.get("/teste", enquetes.findAll);
  
    // Update a enquete with id
    router.put("/:id", enquetes.update);
  
    // Delete a enquete with id
    router.delete("/:id", enquetes.delete);
  
    // Delete all enquetes
    router.delete("/", enquetes.deleteAll);
  
    app.use('/api/enquetes', router);
  };
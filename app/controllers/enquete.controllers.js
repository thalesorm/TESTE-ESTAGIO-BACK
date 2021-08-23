const db = require("../models");
const Enquete = db.enquete;
const Op = db.Sequelize.Op;

const Sequelize = require("sequelize");


exports.create = (req, res) => {

  if (!req.body.title) {
    res.status(400).send({
      message: "Titulo em Branco!"
    });
    return;
  }

 
  const enquete = {
    title: req.body.title,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    status: req.body.status
  };


  Enquete.create(enquete)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro ao criar enquete."
      });
    });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: '%${title}%' } } : null;
  
    Enquete.findAll({
    
       where: condition,
       include: 
       [
        { model: db.option, as: 'options',      
        include: [{
                    model:  db.vote, as: 'votes',
    
        }] }
       ]
     })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
  
  exports.findAllStatus = (req, res) => {
    var statusVar = req.body.status;
  
    Enquete.findAll({
    
       where: {
        status: statusVar,
       },
       include: 
       [
        { model: db.option, as: 'options', include: [{
          model:  db.vote, as: 'votes',
        }] }
       ] })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Enquete.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };
  
  // Update a Tutorial by the id in the request
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Enquete.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: 'Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!'
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };
  
  // Delete a Tutorial with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Enquete.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: 'Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!'
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };
  
  // Delete all Tutorials from the database.
  exports.deleteAll = (req, res) => {
    Enquete.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: '${nums} Tutorials were deleted successfully!' });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };
  
  // find all published Tutorial
  exports.findAllPublished = (req, res) => {
    Enquete.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

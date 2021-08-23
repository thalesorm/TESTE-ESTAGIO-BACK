const db = require("../models");
const Option = db.option;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (req.body.length<=2) {
        res.status(400).send({
          message: "cadastrou menos que tres"
        });
        return;
      }
   
      var options = []
      for(var i = 0; i< req.body.length; i++){
       var optionObj = {
       "title" : req.body[i].title,
       "enqueteId" : req.body[i].enqueteId
        }
      options.push(optionObj); 
      }
  
    Option.bulkCreate(options)
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

  Enquete.  findAll({
     include: 
     [
       { model: db.option, as: 'options' }
     ],
     where: condition })
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
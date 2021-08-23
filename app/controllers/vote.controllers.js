const db = require("../models");
const Vote = db.vote;
const Option = db.option;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

      const vote = {
        optionId: req.body.optionId,
      };
  
      Vote.create(vote)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erro ao salvar voto."
      });
    });

    
};

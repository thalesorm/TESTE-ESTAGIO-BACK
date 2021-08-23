  module.exports = (sequelize, Sequelize) => {
      const Enquete = sequelize.define("enquete", {
        title: {
          type: Sequelize.STRING
        },
        dateStart: {
          type: Sequelize.DATE
        },
        dateEnd: {
          type: Sequelize.DATE
        },
        status:{
          type:Sequelize.STRING,
        }
      });
    
      return Enquete;
    };
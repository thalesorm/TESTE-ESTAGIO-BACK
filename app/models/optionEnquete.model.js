module.exports = (sequelize, Sequelize) => {
    const Option = sequelize.define("option", {
      title: {
        type: Sequelize.STRING
      },
      enqueteId : {
        type: Sequelize.INTEGER,
        references: {
            model: 'enquetes',
            key: 'id'
        }  // or "conversations"? This is a table name

    }
    });
  
    return Option;
  };
  
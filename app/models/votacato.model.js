    module.exports = (sequelize, Sequelize) => {
        const Vote = sequelize.define("vote", {
        
        optionId : {
            type: Sequelize.INTEGER,
            references: {
                model: 'options',
                key: 'id'
            }  // or "conversations"? This is a table name

        }
        });
    
        return Vote;
    };
    
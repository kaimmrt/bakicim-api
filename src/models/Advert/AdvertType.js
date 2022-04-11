module.exports = (sequelize, Sequelize) => {
    return sequelize.define('advert_type', {
        advert_type_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        advert_type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })
};
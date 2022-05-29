module.exports = (sequelize, Sequelize) => {
    return sequelize.define('advert_time', {
        advert_time_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        advert_time: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })
};
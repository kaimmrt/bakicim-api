module.exports = (sequelize, Sequelize) => {
    return sequelize.define('favorite', {
        favorite_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        advert_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    })
};
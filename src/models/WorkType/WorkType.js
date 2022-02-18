module.exports = (sequelize, Sequelize) => {
    return sequelize.define('work_type', {
        work_type_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        work_type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })
};
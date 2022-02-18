module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user', {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_type_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        gender_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        birthday: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        adress: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        tc: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        photo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        cv: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        cover_letter: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        city: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        district: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
    })
};
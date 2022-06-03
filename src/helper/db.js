const Sequelize = require('sequelize');
const sequelize = new Sequelize('bitirme', 'root', 'root', {
    host: 'localhost',
    port: 8889,
    dialect: 'mysql',
    timezone: "+03:00",
    logging: false
});
const db = {};


db.User = require(__dirname + "/../models/User/User.js")(sequelize, Sequelize)
db.UserType = require(__dirname + "/../models/User/UserType.js")(sequelize, Sequelize)
db.Gender = require(__dirname + "/../models/Gender/Gender.js")(sequelize, Sequelize)
db.AdvertType = require(__dirname + "/../models/Advert/AdvertType.js")(sequelize, Sequelize)
db.AdvertTime = require(__dirname + "/../models/Advert/AdvertTime.js")(sequelize, Sequelize)
db.Advert = require(__dirname + "/../models/Advert/Advert.js")(sequelize, Sequelize)
db.Favorite = require(__dirname + "/../models/Favorite/Favorite.js")(sequelize, Sequelize)
db.Offer = require(__dirname + "/../models/Offer/Offer.js")(sequelize, Sequelize)

// db.Verification = require(__dirname + "/../models/Verification/Verification.js")(sequelize, Sequelize)
// db.VerificationType = require(__dirname + "/../models/Verification/VerificationType.js")(sequelize, Sequelize)
// db.Notification = require(__dirname + "/../models/Notification/Notification.js")(sequelize, Sequelize)
// db.Payment = require(__dirname + "/../models/Payment/Payment.js")(sequelize, Sequelize)
// db.Comment = require(__dirname + "/../models/Comment/Comment.js")(sequelize, Sequelize)
// db.Chat = require(__dirname + "/../models/Chat/Chat.js")(sequelize, Sequelize)
// db.ForgotPassword = require(__dirname + "/../models/ForgotPassword/ForgotPassword.js")(sequelize, Sequelize)

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.UserType.hasMany(db.User, { foreignKey: "user_type_id", onDelete: "restrict", onUpdate: "restrict" });
db.User.belongsTo(db.UserType, { foreignKey: "user_type_id", onDelete: "restrict", onUpdate: "restrict", });

db.Gender.hasMany(db.User, { foreignKey: "gender_id", onDelete: "restrict", onUpdate: "restrict" });
db.User.belongsTo(db.Gender, { foreignKey: "gender_id", onDelete: "restrict", onUpdate: "restrict", });

db.AdvertType.hasMany(db.Advert, { foreignKey: "advert_type_id", onDelete: "restrict", onUpdate: "restrict" });
db.Advert.belongsTo(db.AdvertType, { foreignKey: "advert_type_id", onDelete: "restrict", onUpdate: "restrict", });

db.AdvertTime.hasMany(db.Advert, { foreignKey: "advert_time_id", onDelete: "restrict", onUpdate: "restrict" });
db.Advert.belongsTo(db.AdvertTime, { foreignKey: "advert_time_id", onDelete: "restrict", onUpdate: "restrict", });

db.User.hasMany(db.Advert, { foreignKey: "user_id", onDelete: "restrict", onUpdate: "restrict" });
db.Advert.belongsTo(db.User, { foreignKey: "user_id", onDelete: "restrict", onUpdate: "restrict", });

db.User.hasMany(db.Favorite, { foreignKey: "user_id", onDelete: "restrict", onUpdate: "restrict" });
db.Favorite.belongsTo(db.User, { foreignKey: "user_id", onDelete: "restrict", onUpdate: "restrict", });

db.Advert.hasMany(db.Favorite, { foreignKey: "advert_id", onDelete: "restrict", onUpdate: "restrict" });
db.Favorite.belongsTo(db.Advert, { foreignKey: "advert_id", onDelete: "restrict", onUpdate: "restrict", });

// db.VerificationType.hasMany(db.Verification, { foreignKey: "verification_type_id", onDelete: "restrict", onUpdate: "restrict" });
// db.Verification.belongsTo(db.VerificationType, { foreignKey: "verification_type_id", onDelete: "restrict", onUpdate: "restrict", });

// db.User.hasMany(db.Verification, { foreignKey: "user_id", onDelete: "restrict", onUpdate: "restrict" });
// db.Verification.belongsTo(db.User, { foreignKey: "user_id", onDelete: "restrict", onUpdate: "restrict", });

// db.User.hasMany(db.Notification, { foreignKey: "user_id", onDelete: "restrict", onUpdate: "restrict" });
// db.Notification.belongsTo(db.User, { foreignKey: "user_id", onDelete: "restrict", onUpdate: "restrict", });

db.User.hasMany(db.Offer, { foreignKey: "user_id", onDelete: "restrict", onUpdate: "restrict" });
db.Offer.belongsTo(db.User, { foreignKey: "user_id", onDelete: "restrict", onUpdate: "restrict", });

db.Advert.hasMany(db.Offer, { foreignKey: "advert_id", onDelete: "restrict", onUpdate: "restrict" });
db.Offer.belongsTo(db.Advert, { foreignKey: "advert_id", onDelete: "restrict", onUpdate: "restrict", });

// db.Offer.hasMany(db.Payment, { foreignKey: "offer_id", onDelete: "restrict", onUpdate: "restrict" });
// db.Payment.belongsTo(db.Offer, { foreignKey: "offer_id", onDelete: "restrict", onUpdate: "restrict", });

// db.User.hasMany(db.ForgotPassword, { foreignKey: "user_id", onDelete: "restrict", onUpdate: "restrict" });
// db.ForgotPassword.belongsTo(db.User, { foreignKey: "user_id", onDelete: "restrict", onUpdate: "restrict", });

// db.User.hasMany(db.Chat, { foreignKey: "user_id", onDelete: "restrict", onUpdate: "restrict" });
// db.Chat.belongsTo(db.User, { foreignKey: "user_id", onDelete: "restrict", onUpdate: "restrict", });

// db.User.hasMany(db.Comment, { foreignKey: "user_id", onDelete: "restrict", onUpdate: "restrict" });
// db.Comment.belongsTo(db.User, { foreignKey: "user_id", onDelete: "restrict", onUpdate: "restrict", });

module.exports = db;
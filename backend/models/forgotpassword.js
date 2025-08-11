const Sequelize = require('sequelize');
const db = require('../util/db-connection');


const Forgotpassword = db.define('forgotpassword', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    active: Sequelize.BOOLEAN,
    expiresby: Sequelize.DATE
})

module.exports = Forgotpassword;

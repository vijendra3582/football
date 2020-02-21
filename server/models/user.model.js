const sequelize = require("./../config/database");

module.exports = {
    create: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data) + '"'.replace(/"/g, "'");
        sequelize.query('CALL User_Registration(' + queryData + ')').then(response => {
            var response = JSON.parse(response[0].message);
            return callBack(null, response);
        }).catch(error => {
            callBack(error);
        });
    },

    getUserByUserEmail: (email, callBack) => {
        var data = { "field": "email", "value": email };
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data) + '"'.replace(/"/g, "'");
        sequelize.query('CALL Get_User_Single(' + queryData + ')').then(response => {
            return callBack(null, response[0]);
        }).catch(error => {
            callBack(error);
        });
    },

    getUserByUserId: (id, callBack) => {
        var data = { "field": "id", "value": id };
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data) + '"'.replace(/"/g, "'");
        sequelize.query('CALL Get_User_Single(' + queryData + ')').then(response => {
            return callBack(null, response[0]);
        }).catch(error => {
            callBack(error);
        });
    },

    getUsers: callBack => {
        var data = { "field": "1", "value": "1" };
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data) + '"'.replace(/"/g, "'");
        sequelize.query('CALL Get_User_Single(' + queryData + ')').then(response => {
            return callBack(null, response);
        }).catch(error => {
            callBack(error);
        });
    },

    updateUser: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data) + '"'.replace(/"/g, "'");
        sequelize.query('CALL User_Update(' + queryData + ')').then(response => {
            var response = JSON.parse(response[0].message);
            return callBack(null, response);
        }).catch(error => {
            callBack(error);
        });
    },

    deleteUser: (data, callBack) => {
        var data = { "field": "id", "value": id };
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data) + '"'.replace(/"/g, "'");
        sequelize.query('CALL User_Delete(' + queryData + ')').then(response => {
            var response = JSON.parse(response[0].message);
            return callBack(null, response);
        }).catch(error => {
            callBack(error);
        });
    }
};
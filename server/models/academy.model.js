const sequelize = require('./../config/database');

module.exports = {
    create: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data) + '"'.replace(/"/g, "'");
        sequelize.query('CALL Insert_Academy(' + queryData + ')').then(response => {
            var response = JSON.parse(response[0].message);
            return callBack(null, response);
        }).catch(error => {
            callBack(error);
        });
    },

    update: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data) + '"'.replace(/"/g, "'");
        sequelize.query('CALL Update_Academy(' + queryData + ')').then(response => {
            var response = JSON.parse(response[0].message);
            return callBack(null, response);
        }).catch(error => {
            callBack(error);
        });
    },

    deleteA: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data) + '"'.replace(/"/g, "'");
        sequelize.query('CALL Delete_Academy(' + queryData + ')').then(response => {
            var response = JSON.parse(response[0].message);
            return callBack(null, response);
        }).catch(error => {
            callBack(error);
        });
    },

    single: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data) + '"'.replace(/"/g, "'");
        sequelize.query('CALL Single_Academy(' + queryData + ')').then(response => {
            var response = response[0];
            return callBack(null, response);
        }).catch(error => {
            callBack(error);
        });
    },

    all: (data, callBack) => {
        var queryData = '"'.replace(/"/g, "'") + JSON.stringify(data) + '"'.replace(/"/g, "'");
        sequelize.query('CALL All_Academy(' + queryData + ')').then(response => {
            var response = response;
            return callBack(null, response);
        }).catch(error => {
            callBack(error);
        });
    }
};
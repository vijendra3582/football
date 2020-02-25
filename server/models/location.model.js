const sequelize = require('./../config/database');

module.exports = {
    country: (data, callBack) => {
        sequelize.query('CALL Get_Country()').then(response => {
            var response = response;
            return callBack(null, response);
        }).catch(error => {
            callBack(error);
        });
    },

    state: (data, callBack) => {
        sequelize.query('CALL Get_State(' + data + ')').then(response => {
            var response = response;
            return callBack(null, response);
        }).catch(error => {
            callBack(error);
        });
    },

    city: (data, callBack) => {
        sequelize.query('CALL Get_City(' + data + ')').then(response => {
            var response = response;
            return callBack(null, response);
        }).catch(error => {
            callBack(error);
        });
    },
};
const moment = require('moment');
module.exports = {
    randomIntFromInterval: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    isValidDate: (str) => {
        if (!str) {
            return false;
        }
        const d = moment(str, 'yyyy-mm-dd');
        if (d == null || !d.isValid()) {
            return false;
        }
        return true;
    }
};
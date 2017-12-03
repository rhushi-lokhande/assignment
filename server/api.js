const express = require('express');
const router = express.Router();
var moment = require('moment');
const _util = require('./util');
router.get('/data', (req, res) => {
    var data = [];
    if (!_util.isValidDate(req.query.startdate)) {
        return res.status(422).send('invalid start date');
    }
    if (!_util.isValidDate(req.query.enddate)) {
        return res.status(422).send('invalid end date');
    }
    var mstart, mend;
    mstart = moment(req.query.startdate, 'yyyy-mm-dd');
    mend = moment(req.query.enddate, 'yyyy-mm-dd').endOf('day');
    var count = 0;
    while (mend > mstart && count < 50) {
        data.push({
            date: mstart.add(1, 'second').toString(),
            value: _util.randomIntFromInterval(0, 1000)
        });
        count++;
    }
    res.send(data);
});

module.exports = router;
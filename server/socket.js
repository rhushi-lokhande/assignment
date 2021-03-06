const _util = require('./util');
const moment = require('moment');
exports._socket = (io) => {
    io.sockets.on('connection', (socket) => {
        let invterval;
        socket.on('getData', (data) => {
            const mstart = moment(data.startDate, 'yyyy-mm-dd');
            const mend = moment(data.endDate, 'yyyy-mm-dd').endOf('day');
            invterval = setInterval(() => {
                if (mend > mstart) {
                    socket.emit('updateGraph', {
                        date: mstart.add(data.frequency, 'second').toString(),
                        value: _util.randomIntFromInterval(0, 1000)
                    });
                } else {
                    clearInterval(invterval);
                }
            }, data.frequency * 1000);
        });
        socket.on('disconnect', (data) => {
            clearInterval(invterval);
        });
    });
}
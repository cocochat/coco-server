const mongoose = require('mongoose');

mongoose.connect('mongodb://'+env.DB_HOST+':'+env.DB_PORT+'/'+env.DB_DATABASE, function (err) {
    if (err) throw err;
    console.log('Successfully Connected');
});

const Schema = mongoose.Schema;


// todo add export

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.promise = global.promise;
mongoose.connect('mongodb://'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_DATABASE, { useNewUrlParser: true}, function (err) {
    if (err) throw err;
    console.log('Successfully Connected');
});
const Schema = mongoose.Schema;

module.exports =  {mongoose, Schema};
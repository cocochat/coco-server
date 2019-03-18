module.exports = function(path, mongoose) {
    // exclude these files from the
    // model import routine below
    let exclude = [
        'db',
        'mongoose'
    ];
    
    // load models from model directory
    let fs = require('fs');
    let files = fs.readdirSync('../models');
    let models = {};
    let filename = '';
    for(let i=0; i<files.length; i++){
        filename = files[i].split('.')[0];
        if(exclude.indexOf(filename) == -1) {
            models[filename] = require('../models/' + files[i])(mongoose);
            console.log('> loaded model ' + filename);
        }
    }
    
    return models;
}
var recognition = require('./openalpr-api.js');
var fs = require('fs');

// recognition plate

var sourcePath = 'D:/jupyter/car-management/crawer/src/images';
var targetPath = 'D:/jupyter/car-management/api/rimages';

var arg = process.argv.slice().pop();

if (arg == 'recognition') {
    recognition(sourcePath, targetPath);
}





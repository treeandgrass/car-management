var FormData = require('form-data');
var fs = require('fs');

var form = new FormData();
form.append('file', fs.createReadStream('./1.jpg'));

form.submit('http://192.168.99.100:5000/upload', function(err, res) {
    var chuncks = [];
    res.on('data', function (chunck) {
        chuncks.push(chunck);
    })
    res.on('end', function () {
        console.log(chuncks.join(''));
    })
});
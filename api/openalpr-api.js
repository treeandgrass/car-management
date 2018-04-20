var OpenalprApi = require('openalpr_api');
var fs = require('fs');
var util = require('util');
var path = require('path');


function callApi(path) {
    if (!path || !fs.existsSync(path)) return;

    var api = new OpenalprApi.DefaultApi()
    
    var readFile = util.promisify(fs.readFile);
    return new Promise((resolve, reject) => {
        readFile(path).then(body => {
            
            var imageBytes = body.toString('base64'); // {String} The image file that you wish to analyze encoded in base64 
            var secretKey = "sk_39f0223090cee88df0202fcc"; // {String} The secret key used to authenticate your account.  You can view your  secret key by visiting  https://cloud.openalpr.com/ 
        
            var country = "cn"; // {String} Defines the training data used by OpenALPR.  \"us\" analyzes  North-American style plates.  \"eu\" analyzes European-style plates.  This field is required if using the \"plate\" task  You may use multiple datasets by using commas between the country  codes.  For example, 'au,auwide' would analyze using both the  Australian plate styles.  A full list of supported country codes  can be found here https://github.com/openalpr/openalpr/tree/master/runtime_data/config 
        
            var opts = { 
                'recognizeVehicle': 0, // {Integer} If set to 1, the vehicle will also be recognized in the image This requires an additional credit per request 
                'state': "cn", // {String} Corresponds to a US state or EU country code used by OpenALPR pattern  recognition.  For example, using \"md\" matches US plates against the  Maryland plate patterns.  Using \"fr\" matches European plates against  the French plate patterns. 
                'returnImage': 0, // {Integer} If set to 1, the image you uploaded will be encoded in base64 and  sent back along with the response 
                'topn': 10, // {Integer} The number of results you would like to be returned for plate  candidates and vehicle classifications 
                'prewarp': "" // {String} Prewarp configuration is used to calibrate the analyses for the  angle of a particular camera.  More information is available here http://doc.openalpr.com/accuracy_improvements.html#calibration 
            };
        
            var callback = function(error, data, response) {
                if (error) {
                    reject(error);
                } else {
                    if (data.results.length == 0) resolve();
                    else resolve(data.results[0].plate);
                }
            };
    
            api.recognizeBytes(imageBytes, secretKey, country, opts, callback);
    
        }).catch(err => {
            reject(err);
        })  
    })
}


var dirs = [];

function readFile (d) {
    if (!fs.existsSync(d)) {
        console.log('path not exits!')
        return
    }
    var stat = fs.statSync(d)

    if (stat.isFile()) {
        dirs.push(d)
    } else {
        fs.readdirSync(d).forEach(function (dir) {
            readFile(path.join(d, dir))
        })
    }
}


// control function
module.exports = function (sourcePath, targetPath) {
    function get () {

        if (dirs.length < 2) {
            dirs = [];
            readFile(sourcePath);
        }

        if (dirs.length == 0) return; 

        var path = dirs.pop();
        if (path) {
           
            callApi(path).then(p => {
                // recognition is true
                if (p) {
                    var suffix = path.split('/').pop().split('.').pop();
                    var newPaths = [targetPath, '/', p, '.', suffix]
                    fs.copyFile(path, newPaths.join(''), function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            fs.unlink(path, function (err) {
                               if (err) console.log(err);
                            });
                        }
                    });
                } 
                else {
                    fs.unlink(path, function (err) {
                        if (err) console.log(err);
                    });
                }

                if (dirs.length > 0) setTimeout(get, 0);
            }).catch( err => {

                fs.unlink(path, function (err) {
                    if (err) console.log(err);
                });
                
                setTimeout(get, 0);
                console.log(err)
                console.log(path);
            })
        }
    }

    setTimeout(get, 0);
}

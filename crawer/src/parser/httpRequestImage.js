const http = require("http");
const fs = require('fs');

function request (data, url, method) {
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify(data)
      const options = {
        hostname: 'localhost',
        port: 9000,
        path: url,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };
      
      const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        let chunks = []
        let headers = JSON.stringify(res.headers);
        
        res.on('data', function (chunk) {
          chunks.push(chunk);
        })

        res.on('end', function () {
          resolve({headers: headers, data: Buffer.from(chunks)});
        })
      });
      
      req.on('error', (e) => {
        reject(e.message)
      });
      
      // write data to request body
      req.write(null);
      req.end();
    })
}


module.exports = request;
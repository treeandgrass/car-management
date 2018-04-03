const http = require("http");
const fs = require('fs');
const { URL } = require('url');

function request (data, url, host, port, method) {
  
    let postData = '';
    if (!host) host = new URL(url).host;

    function createOpts (data, url, host, port, method) {
        const options = {
            hostname: host,
            port: port,
            path: url,
            method: method,
            headers: {
              'Content-Type': 'application/json'
            }
        };

        if (data) {
            postData = Buffer.byteLength(postData);
            options.headers['Content-Length'] = Buffer.byteLength(postData);
        }

        return options;
    }

    return new Promise((resolve, reject) => {

      const options = createOpts(data, url, host, port, method); 
      
      const req = http.request(options, (res) => {
        let chunks = []
        let headers = JSON.stringify(res.headers);
        
        res.on('data', function (chunk) {
          chunks.push(chunk);
        })

        res.on('end', async () => {
          resolve({url: url, headers: headers, chunks: chunks});
        })
      });
      
      req.on('error', (e) => {
        reject(e.message)
      });
      
      // write data to request body
      req.write(postData);
      req.end();
    })
}


module.exports = request;
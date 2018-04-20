
const http = require('http');

let get = (url, params) => {
    let query = [];
    
    if (params && typeof params == 'object') {

        query.push('?');

        Object.keys(params).forEach(k => { 
            query.push(k);
            query.push('=');
            query.push(params[k]); 
            query.push('&');
        });

        query.pop();
    }


    url = url + query.join('');
    
    
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            let error;
            
            if (res.statusCode != 200) error = `statusCode: ${res.statusCode}`
            if (error) console.log(error);
            
            let chunks = [];
    
            res.on('data', chunck => {
                chunks.push(chunck);
            })
        
            res.on('end', () => {
                resolve(Buffer.from(chunks));
            })
    
            if (error) reject(error);
                
        }).on('error', error => { console.log(error) })
    });
    
}



const baseURL = "http://localhost:9000"

// test interface /path
get(baseURL + "/path", {sourceDir: "D:/jupyter/car-management/crawer/src/images", targetDir: "D:/jupyter/car-management/crawer/src/images1"}).then(res => console.log(res))



// test interface getAllPath
// get(baseURL + '/getallpath').then(res => console.log(res.toString())).catch(err => console.log(err)); 

// get(baseURL + '/save', {oldName: '100.jpeg', newName: "元232323"}).catch(err => console.log(err))

get(baseURL + '/query', {name: '95.jpeg'}).then(res => console.log(res)).catch(err => console.log(err));



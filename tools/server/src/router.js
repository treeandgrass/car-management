const fastify = require('fastify')();
const fs = require('fs');
const path = require('path');
const cors = require('cors');


// middleware
fastify.use(cors({
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
    credentials: true
}));


let sourceDir, targetDir;


let checkRootPath = (reply) => {
    if (sourceDir == undefined || targetDir == undefined) reply.code(500).send({results: 'error', redirect: 'http://localhost:8080/index'});
}




fastify.get('/path', function (request, reply) {
    sourceDir = request.query.sourceDir;
    targetDir = request.query.targetDir;
    try {
        let sourceStat = fs.statSync(sourceDir);
        let targetStat = fs.statSync(targetDir);
    } catch(err) {
        reply.code(500).send({msg: 'this is not dircoty'});
        return;
    }

    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
    reply.send();

});


fastify.get('/getallpath', (request, reply) => {
    
    checkRootPath(reply);
    
    const results = [];

    if (!fs.existsSync(sourceDir)) {
        reply.send();
        return;
    }

    fs.readdir(sourceDir, (err, files) => {
        files.forEach(file => {
            let filePath = path.join(sourceDir, file);
            const stat = fs.statSync(filePath);
            if (stat.isFile()) results.push(filePath);
        })

        reply.send(JSON.stringify({results: results}));
    })
})


fastify.get('/save', function (request, reply) {
    checkRootPath(reply);
    
    const newName = request.query.newName;
    const oldName = request.query.oldName;
    const suffix = oldName.split('.').pop();

    const targetPath = targetDir + '/' + [newName, '.', suffix].join('');
    let sourcePath;
    if (!/:/.test(oldName)) sourcePath = sourceDir + '/' + oldName;
    else sourcePath = oldName;

    fs.copyFile(sourcePath, targetPath, function (err) {
        if (err) console.log(err);
        else fs.unlink(sourcePath);
        reply.send(); 
    });

})


fastify.get('/query', function (request, reply) {
    checkRootPath(reply);

    const name = request.query.name;
    const sourcePath = name;

    fs.readFile(sourcePath, function (err, data) {
        reply.send(data);
    });
})


fastify.get('/delete', function (request, reply) {
    const filePath =  request.query.name;
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log(err);
            reply.send(JSON.stringify(err));
            return;
        } else {
            reply.send();
        }
    })
})



const start = async () => {
    fastify.listen(9000, err => {
        if (err) {
            console.log(err);
            process.exit(1);
        } 
    })
}

start();



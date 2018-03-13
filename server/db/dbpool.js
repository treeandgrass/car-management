const mysql = require('mysql')

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'mymy',
    database: 'carmanagement'
})


let connectionCount = 0


pool.on('release', function(err) {
    if (err) {
        console.log('release failed: ' + JSON.stringify(err))
    } else {
        consloe.log('release success')
    }
})


pool.on('enqueue', function(err) {
    connectionCount ++
    console.log('wait connection: ' + connectionCount)
})


pool.on('acquire', function(connection) {
    connectionCount > 0 ? connectionCount ++ : null
    console.log('wait connection: ' + connectionCount)
})


function getPool () {
    return pool
}

function colsePool () {
    pool.end(function (err) {
        if (err) {
            console.log('pool close failed: '+ JSON.stringify(err))
        } else {
            console.log('close success')
        }
    })
}

// export get and close method
module.exports = {
    getPool,
    colsePool
}
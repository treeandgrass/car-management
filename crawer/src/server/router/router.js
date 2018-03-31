const fastify = require('fastify')()
const { getServiceJsObject, getServiceJsObjectSync } = require('../utils/readFile.js')
const fs = require('fs')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/URL');
const serveStatic = require('serve-static')
const path = require('path')
// load all dbmodel
const dbDir = '../db'
getServiceJsObjectSync(dbDir)
const IndexModel = mongoose.model('IndexModel')

// load all service
const dir = '../service'
const Service = getServiceJsObjectSync(dir)



/*************  router ************/


//add
fastify.route({
    method: 'POST',
    url: '/url/save',
    schema: {
        querystring: {
            urls: {type: 'array'}
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                page: { type: 'string' }
            }
        }
    },
    handler: function (request, reply) {
        Service.storage(request.body)
        reply.send({page: "success"})
    }
})

// query

fastify.get('/url/query', function(request, reply) {
    const url = request.query.url
    let re = new RegExp(url, 'i')
    IndexModel.find({ url: re }, function(err, docs) {
        try {
            reply.send(docs)
            console.log(docs)
        } catch (err) {
            reply.code(500).send(err)
        }
    })
})


fastify.get('/url/queryMany', function (request, reply) {
    const query = IndexModel.find()
    query.skip(0).limit(100).exec(function (err, docs) {
        reply.send(docs)
    })
})

// update
fastify.get('/url/update', function(request, reply) {
    const id = request.query.id
    const url = request.query.url
    IndexModel.findByIdAndUpdate({_id: id}, {url: url}, function (err, docs) {
        try {
            reply.send(docs)
        } catch (err) {
            reply.send(err)
        }
    })
})

//delete
fastify.get('/url/delete', function (request, reply) {
    const id = request.query.id
    IndexModel.deleteOne({_id: id}, function (err, docs) {
        try {
            if (!err) {
                reply.send(docs)
            }
        } catch (err) {
            reply.send(err)
        }
    })
})



// listen 3000
const start = async () => {
    try {
        await fastify.listen(9000)
        process.setMaxListeners(1)
        console.log('fastify start success!')
        process.on("exit", () => {
            fastify.close()
        })
        process.on('beforeExit', () => {
            console.log("exit")
        })
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

start()
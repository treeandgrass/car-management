const fastify = require('fastify')()
const { getServiceJsObject, getServiceJsObjectSync } = require('../utils/readFile.js')
const cors = require('cors');


// middleware
fastify.use(cors({
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
    credentials: true
}));


// load all service
const dir = '../service' 
const Service = getServiceJsObjectSync(dir)


// router

fastify.get('/login', (request, reply) => {
    reply.send('success!')
})




// listen 3000
const start = async () => {
    try {
        await fastify.listen(3000)
        console.log('fastify start success!')
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
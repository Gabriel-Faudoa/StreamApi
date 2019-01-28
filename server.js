const Hapi = require('hapi');
const monk = require('monk');

const server=Hapi.server({
    host:'localhost',
    port:8000,
    "routes": { "cors": true }
});

const dbUrl = 'mongodb://admin:password1@ds141294.mlab.com:41294/eliasx801site'
const db = monk(dbUrl)

db.then(() => {
    console.log('Connected to MongoDB with Monk')
})

const users = db.get('users')

// Add the route
server.route({
    method:'GET',
    path:'/hello',
    handler:function(request,h) {

        return'hello world';
    }
});

server.route({
    method:'POST',
    path:'/users',
    handler: (request, h) => {
        return users.insert( request.payload )
    }
});

// Start the server
const start =  async function() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();
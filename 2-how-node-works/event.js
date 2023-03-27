const EventEmitter = require('node:events');
const http = require('node:http');

class Sales extends EventEmitter {
    constructor() {
        super();
    };
};
const myEmitter = new Sales();

myEmitter.on('newSale', () => {
    console.log('There was a new sale!');
})

myEmitter.on('newSale', () => {
    console.log('Customer name: Emon');
});

myEmitter.on('newSale', stock => {
    console.log(`There are ${stock} items left in stock`)
})
myEmitter.emit('newSale', 10)


const server = http.createServer();
server.on('request', (req, res) => {
    console.log('Request received');
    console.log(req.url)
    res.end('Request received');
});

server.on('request', (req, res) => {
    console.log('Another Request received');
});
server.close('close', () => {
    console.log('Close request received');
})

server.listen(8000, () => {
    console.log('Listening on port 8000');
});
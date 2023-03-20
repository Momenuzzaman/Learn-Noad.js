const fs = require('fs');
const http = require('http');
const url = require('url');

//////////////////////
//  Files           /
////////////////////

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado ${textIn} .n\ Created 0n ${Date.now()}`;

// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('file written')

// Non-blocking asynchronous

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('Error')
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log('data-2', data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log('data-3', data3);
//             // data write
//             fs.writeFile('./txt/final.txt', `${data2}\n ${data3}`, 'utf-8', err => {
//                 console.log('You have successfully');
//             });
//         });
//     });
// });
// console.log('Will read this');



//////////////////////
// Server           /
////////////////////

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the overview');
    }
    else if (pathName === '/product') {
        res.end('This is the product');
    }
    else if (pathName === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(data)
        console.log(dataObj);
    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page note found!</h1>')
    }
});

server.listen(8000, () => {
    console.log('Listening to request on port 8000');
});
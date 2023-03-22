const fs = require('node:fs');
const http = require('node:http');
const url = require('node:url');

const replaceTemplate = require('./module/replaceTemplate');

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



const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');




const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    // OVERVIEW PAGE
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const cartHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cartHtml);
        res.end(output);
    }
    //PRODUCT PAGE
    else if (pathname === '/product') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const product = dataObj[query.id];
        const output = replaceTemplate(templateProduct, product)

        res.end(output);
    }
    // API
    else if (pathname === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(data)
        console.log(dataObj);
    }
    // NOT FOUND
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

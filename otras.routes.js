const express = require('express');
const router  = express.Router();

router.get('/', (request, response) => {
    response.setHeader('Content-Type', 'text/plain');
    response.send("URL index /");
});

router.get('/test_json', (request, response) => {
    response.json({code:200, msg:"Ok GET"});
});

router.post('/test_json', (request, response) => {
    response.json({code:200, msg:"Ok POST"});
});

router.get('/test_html', (request, response) => {
    response.setHeader('Content-Type', 'text/html');    
    response.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Código en HTML</title>
        </head>
        <body>
            <h1>hola mundo desde express</h1>
        </body>
        </html>
    `);
});

module.exports = router;
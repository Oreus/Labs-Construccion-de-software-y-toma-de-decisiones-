const http = require('http');
const path = require('path');
const fs   = require('fs');

const server = http.createServer((request, response) => {    
    console.log("Ruta solicitada:", request.url);
    
    switch(request.url){
        case "/":
            response.setHeader('Content-Type', 'text/plain');
            response.write("Ruta principal - Hola Mundo");
            response.end();   
            break;
            
        case "/test_html":
            response.setHeader('Content-Type', 'text/html');    
            response.write(`
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="utf-8">
                    <title>Código en HTML</title>
                </head>
                <body>
                    <h1>Hola mundo desde la ruta 2</h1>
                </body>
                </html>
            `);
            response.end();   
            break;
            
        case "/form_method":
            if(request.method === "GET"){
                response.setHeader('Content-Type', 'text/html');
                const html = fs.readFileSync(path.resolve(__dirname, './form.html'), 'utf8')
                response.write(html);
                response.end();  
            } else if(request.method === "POST"){
                let body = [];
                request
                .on('data', chunk => {
                    body.push(chunk);
                })
                .on('end', () => {
                    body = Buffer.concat(body).toString();
                    console.log("Datos recibidos:", body);

                    const filePath = path.resolve(__dirname, './datos.txt');
                    fs.appendFileSync(filePath, body + '\n', 'utf8'); 

                    response.setHeader('Content-Type', 'application/json');
                    response.statusCode = 200;
                    response.write('{code:200, msg:"Datos guardados en datos.txt correctamente"}');
                    response.end();
                });  
            }    
            break;

        default:
            response.statusCode = 404;
            response.setHeader('Content-Type', 'text/plain; charset=utf-8');
            response.write('Error 404 - La ruta solicitada no existe');
            response.end();
            break;
    }
});

server.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
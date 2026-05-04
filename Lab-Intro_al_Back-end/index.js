const fs = require('fs');
const http = require('http');
const path = require('path');

function calcularPromedio(numeros) {
    if (numeros.length === 0) return 0;
    const suma = numeros.reduce((acc, val) => acc + val, 0);
    return suma / numeros.length;
}

function escribirTextoEnArchivo(nombreArchivo, contenido) {
    fs.writeFileSync(nombreArchivo, contenido);
    return `Se creó el archivo ${nombreArchivo}`;
}

function esPalindromo(palabra) {
    const limpia = palabra.toLowerCase().replace(/[\W_]/g, '');
    const invertida = limpia.split('').reverse().join('');
    return limpia === invertida;
}

const server = http.createServer((request, response) => {
    
    if (request.url === "/") {
        const miArreglo = [10, 20, 30, 40, 50, 60];
        const resultadoPromedio = calcularPromedio(miArreglo);
        const resultadoArchivo = escribirTextoEnArchivo("resultado_tarea.txt", "Archivo creado por Node.js");
        const frasePrueba = "Anita lava la tina";
        const resultadoPalindromo = esPalindromo(frasePrueba) ? "Sí" : "No";

        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Resultados de Node.js</title>
            </head>
            <body>
                <h1>Resultados de los Ejercicios JS</h1>
                
                <h3>1. Promedio de Arreglo</h3>
                <p>Promedio de [${miArreglo.join(', ')}]: ${resultadoPromedio}</p>

                <h3>2. Módulo FileSystem (fs)</h3>
                <p>${resultadoArchivo}</p>

                <h3>3. Palíndromo</h3>
                <p>¿"${frasePrueba}" es palíndromo?: ${resultadoPalindromo}</p>

                <br>
                <h2>Laboratorios Anteriores</h2>
                <a href="/lab-anterior">Ir al laboratorio Rutas y Formas</a>
            </body>
            </html>
        `);
        response.end();
    } 

    else if (request.url === "/lab-anterior") {
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        try {
            const rutaLabAnterior = path.resolve(__dirname, '../Lab-Rutas_y_Formas/form.html');
            const html = fs.readFileSync(rutaLabAnterior, 'utf8');
            response.write(html);
        } catch (error) {
            response.write("<h1>Error</h1><p>No se encontró el archivo. Asegúrate de que form.html exista en la carpeta Lab-Rutas_y_Formas.</p>");
        }
        response.end();
    }

    else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/plain; charset=utf-8');
        response.write("404 - Ruta no encontrada");
        response.end();
    }
});

server.listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000");
});
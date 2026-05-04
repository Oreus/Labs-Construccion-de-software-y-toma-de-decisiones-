const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const rutasFormulario = require("./formulario.routes");
const rutasOtras      = require("./otras.routes");

app.use((request, response, next) => {
    console.log('Middleware: Nueva petición recibida a', request.url);
    next(); 
});

app.use('/formulario', rutasFormulario);
app.use('/', rutasOtras);

app.use((request, response, next) => {
    console.log('Error 404: Ruta no encontrada');
    response.status(404).send('¡Page Not Found - Error 404!'); 
});

app.listen(3000, () => {
    console.log("Servidor Express corriendo en http://localhost:3000");
});
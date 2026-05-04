const express = require('express');
const fs      = require('fs');
const path    = require('path');
const router  = express.Router();

router.get('/form_method', (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    const html = fs.readFileSync(path.resolve(__dirname, './form.html'), 'utf8');
    response.send(html);
});

router.post('/form_method', (request, response) => {
    const indice = Number(request.body.indice);
    const imprimir = request.body.imprimir;

    const datosParaGuardar = `Índice: ${indice}, Imprimir: ${imprimir}\n`;
    fs.appendFileSync(path.resolve(__dirname, './datos_formulario.txt'), datosParaGuardar, 'utf8');

    response.status(200).json({ 
        code: 200, 
        msg: "Ok POST. ¡Datos guardados exitosamente en datos_formulario.txt!" 
    });
});

module.exports = router;
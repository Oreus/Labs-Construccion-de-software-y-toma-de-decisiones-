const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

/*
const helmet = require('helmet');

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "script-src": ["self", "https://cdn.jsdelivr.net"],
        }
    }
}));
*/

app.set('view engine', 'ejs');
app.set('views', 'views');


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const session = require('express-session');
app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste',
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    }
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(doubleCsrfProtection);

app.use((req, res, next) => {
    res.locals.csrfToken = generateCsrfToken(req, res);
    next();
});

app.get('/', (request, response, next) => {
    response.setHeader('Content-Type', 'text/plain');
    response.send("Hola Mundo");
    response.end();
});

app.get("/test_ejs", (request, response, next) => {
    response.render("usuarios/login");
});

const rutasUsuarios = require('./routes/usuarios.routes');
const { default: helmet } = require('helmet');
const { contentSecurityPolicy } = require('helmet');

app.use('/usuarios', rutasUsuarios);

/*COOKIES */
app.get('/test_cookie', (request, response, next) => {
    response.setHeader('Content-Type', 'text/plain');
    response.setHeader('Set-Cookie', 'mi_cookie=123; HttpOnly');
    response.send("Hola Mundo");
    response.end();
});

app.get('/test_value_cookie', async (request, response, next) => {
    response.setHeader('Content-Type', 'text/plain');
    response.send(request.cookies.mi_cookie);
    response.end();
});

app.get('/test_session', async (request, response, next) => {
    request.session.mi_variable = "valor"
    response.setHeader('Content-Type', 'text/plain');
    response.send(request.session.mi_variable);
    response.end();
});


app.get('/test_session_variable', async (request, response, next) => {
    response.setHeader('Content-Type', 'text/plain');
    response.send(request.session.mi_variable);
    response.end();
});

app.get('/logout', async (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/'); //Este código se ejecuta cuando la sesión se elimina.
    });
});

app.get('/test_db', async (request, response, next) => {
    let conn;

    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM books")
        console.log(rows);
        const jsonS = JSON.stringify(rows);
        response.writeHead(200, { 'Content-type': 'text/html' });
        response.end(jsonS);
    } catch (e) {
        console.log(e)
    }
});



const server = http.createServer((request, response) => {
    console.log(request.url);
});
app.listen(3000);
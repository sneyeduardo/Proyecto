const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

const rutaAdmin = path.join(__dirname, 'admin');
const rutaTienda = path.join(__dirname, 'tienda');

// 1. Configurar Handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// 2. Archivos estáticos (CSS, JS, imágenes, plugins y el panel admin)
app.use('/admin', express.static(rutaAdmin));
app.use('/', express.static(rutaTienda, { index: false }));

// 3. Rutas con Handlebars (vistas modulares)
app.get('/', (req, res) => {
  res.render('home', {
    title: 'ConstruGuía - La Guía de la Construcción en Venezuela',
    isHome: true,
    pageJs: '/js/construguia-home.js',
  });
});

app.get('/Registro_Natural', (req, res) => {
  res.render('registro-natural', {
    title: 'ConstruGuía - Registro de Profesional o Técnico',
    isDirectorio: true,
    pageCss: '/css/registro-natural.css',
    pageJs: '/js/registro-natural.js',
  });
});

// Ruta temporal para login (usa tu login.html actual sin header ni footer)
app.get('/login', (req, res) => {
  res.sendFile(path.join(rutaTienda, 'login.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor ConstruGuía corriendo en http://localhost:${PORT}`);
});
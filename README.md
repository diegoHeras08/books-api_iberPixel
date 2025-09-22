Books API es una aplicación RESTful desarrollada con Node.js y Express que permite gestionar una colección de libros mediante operaciones CRUD (Create, Read, Update, Delete).

La aplicación utiliza SQLite como base de datos para persistir los datos.

## Instalación

git clone https://github.com/diegoHeras08/books-api_iberPixel.git

cd books-api

npm install

## Ejecución

    Producción: npm start

    Desarrollo: npm run dev

    Tests: npm test

Servidor en: http://localhost:3000
## Decisiones técnicas

    Express para API REST.

    SQLite como BD ligera.

    UUID v4 para IDs únicos.

    Arquitectura en capas (ruta, controlador, modelo).

    Tests con Supertest + Jest.

## Estructura

app.js          # Configuración Express
server.js       # Arranque servidor
database.js     # Conexión SQLite
routes/         # Rutas API
controllers/    # Lógica de negocio
models/         # Acceso BD
tests/          # Pruebas Jest


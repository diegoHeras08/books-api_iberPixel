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

## Test 
        

> ⚠️ Nota: En Windows PowerShell `curl` es un alias de `Invoke-WebRequest`.  
> Si los comandos con `-X` o `-d` fallan, mira la sección **Alternativas**.

### Obtener todos los libros

curl -X GET http://localhost:3000/api/books

### Crear un libro

curl -X POST http://localhost:3000/api/books \
     -H "Content-Type: application/json" \
     -d '{"title":"Mi libro","author":"Yo"}'

### Obtener un libro por ID

curl -X GET http://localhost:3000/api/books/<ID>

### Actualizar un libro completo (PUT)

curl -X PUT http://localhost:3000/api/books/<ID> \
     -H "Content-Type: application/json" \
     -d '{"title":"Nuevo título","author":"Nuevo autor","isRead":true}'

### Actualizar solo el estado de lectura (PATCH)

curl -X PATCH http://localhost:3000/api/books/<ID>/read \
     -H "Content-Type: application/json" \
     -d '{"isRead":true}'
     curl -X PATCH http://localhost:3000/api/books/<ID>/read \
     -H "Content-Type: application/json" \
     -d '{"isRead":false}'

###Eliminar un libro

curl -X DELETE http://localhost:3000/api/books/<ID>

🖥️ Alternativas si curl falla
1. PowerShell (Invoke-WebRequest)

Invoke-WebRequest -Uri http://localhost:3000/api/books -Method GET

Invoke-WebRequest -Uri http://localhost:3000/api/books -Method POST `
    -Headers @{ "Content-Type" = "application/json" } `
    -Body '{"title":"Libro PowerShell","author":"Autor PS"}'


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


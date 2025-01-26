# Proyecto CRUD con Node.js, Vue.js y MySQL

Este es un proyecto CRUD (Crear, Leer, Actualizar, Eliminar) completo que utiliza un backend desarrollado con **Node.js**, **Express** y **Sequelize** para interactuar con una base de datos **MySQL**, y un frontend construido con **Vue.js**. El frontend se comunica con el backend usando **Axios** para realizar peticiones HTTP.

## Estructura del Proyecto

El proyecto está dividido en dos carpetas principales:

- **`backend/`**: Contiene el servidor Node.js con Express, la configuración de la base de datos MySQL y el ORM Sequelize.
- **`frontend/`**: Contiene la aplicación frontend construida con Vue.js que interactúa con el backend a través de Axios.

## Requisitos

Antes de empezar, asegúrate de tener instalado lo siguiente en tu máquina:

- **Node.js** (v14 o superior)
- **MySQL** (o acceso a una base de datos MySQL)
- **npm** (para administrar dependencias)

## Instalación

### Backend

1. Navega a la carpeta `backend/`:

   ```bash
   cd backend/

2. Instala las dependencias:

   npm install

3. Crea un archivo .env en la raíz de la carpeta backend/ con las siguientes variables de entorno:

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=salvador2025
    DB_NAME=empresa
    PORT=8000

4. Ejecutar el servidor:

    npm start


### Frontend

1. Navega a la carpeta `crud-aplication/`:

   ```bash
   cd crud-aplication/

2. Instala las dependencias:

   npm install

3. Ejecutar el servidor frontend:

    npm run serve


## Tecnologias

### Backtend
    Node.js: Entorno de ejecución para JavaScript.
    Express: Framework para crear la API RESTful.
    Sequelize: ORM para interactuar con la base de datos MySQL.
    MySQL: Sistema de gestión de bases de datos relacional.
    dotenv: Gestión de variables de entorno.
### Frontend
    Vue.js: Framework para construir interfaces de usuario interactivas.
    Axios: Biblioteca para hacer peticiones HTTP.

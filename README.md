
# API GraphQL para un Blog


Este proyecto es una aplicación Node.js que utiliza Express, GraphQL y Mongoose para crear una API GraphQL para un blog.

## Configuración

Para configurar el proyecto, primero debes clonar el repositorio en tu máquina local y luego instalar las dependencias con `pnpm install`.

```bash
  pnpm install
```

Luego, debes crear un archivo `.env` en la raíz del proyecto y agregar las siguientes variables de entorno:

```bash
  MONGODB_URI=mongodb://localhost/graphqlblog
  PORT=3000
  JWT_SECRET=newpassword
```
Puedes cambiar los valores de estas variables según tus necesidades.

## Ejecución

Para ejecutar el proyecto, puedes usar el comando `pnpm run dev`. Esto iniciará el servidor en el puerto especificado en la variable de entorno `PORT`.

```bash
  pnpm run dev
```

## Uso

La API GraphQL está disponible en la ruta `/graphql`. Puedes usar una herramienta como GraphiQL o GraphQL Playground para explorar la API y realizar consultas y mutaciones.

```http
  http://localhost:3000/graphql
```

La API incluye varios tipos de consulta y mutación para interactuar con los datos del blog, incluyendo usuarios, publicaciones y comentarios. Consulta el archivo `schema.js` para obtener más información sobre los tipos de consulta y mutación disponibles.
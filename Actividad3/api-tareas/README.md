# API de Gestión de Tareas

## 📋 Descripción del Proyecto

Esta es una **API RESTful** desarrollada en Node.js que permite la gestión completa de tareas con sistema de autenticación de usuarios. El proyecto implementa operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para tareas y incluye un sistema de registro e inicio de sesión mediante tokens JWT (JSON Web Token).

La arquitectura del proyecto sigue el patrón de diseño de API REST, utilizando Express.js como framework principal y almacenamiento en archivos JSON para persistencia de datos. Este enfoque permite una implementación ligera y funcional sin necesidad de una base de datos tradicional.

---

## 🛠️ Tecnologías Utilizadas

El proyecto hace uso de las siguientes tecnologías y dependencias:

### Dependencias Principales

| Paquete | Versión | Descripción |
|---------|---------|-------------|
| **express** | ^5.2.1 | Framework web minimalista para Node.js que facilita la creación de APIs y aplicaciones web |
| **body-parser** | ^2.2.2 | Middleware para parsear cuerpos de solicitudes JSON en Node.js |
| **bcryptjs** | ^3.0.3 | Biblioteca para hash de contraseñas utilizando el algoritmo bcrypt |
| **jsonwebtoken** | ^9.0.3 | Implementación de tokens JWT para autenticación stateless |

### Herramientas de Desarrollo

- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor
- **npm**: Gestor de paquetes de Node.js
- **VS Code**: Editor de código utilizado para el desarrollo

---

## 📁 Estructura del Proyecto

La organización del proyecto es la siguiente:

```
api-tareas/
├── 📄 server.js          # Archivo principal de la aplicación
├── 📄 package.json       # Configuración y dependencias del proyecto
├── 📄 tareas.json        # Almacén de datos de tareas
├── 📄 usuarios.json      # Almacén de datos de usuarios registrados
└── 📄 .gitignore         # Archivos ignorados por Git
```

### Descripción de Archivos

- **server.js**: Contiene toda la lógica de la API incluyendo rutas, middlewares y controladores
- **tareas.json**: Archivo JSON que almacena el array de tareas creadas por los usuarios
- **usuarios.json**: Archivo JSON que almacena los usuarios registrados con sus contraseñas hasheadas
- **package.json**: Define las dependencias y metadatos del proyecto

---

## ⚙️ Instalación y Configuración

### Requisitos Previos

- Node.js instalado (versión 12 o superior recomendada)
- npm (viene incluido con Node.js)

### Pasos de Instalación

1. **Clonar o descargar el proyecto** en tu directorio local

2. **Instalar las dependencias** ejecutando el siguiente comando en la terminal:

```bash
npm install
```

Este comando leerá el archivo `package.json` e instalará todas las dependencias definidas en la sección `dependencies`.

3. **Ejecutar el servidor**:

```bash
node server.js
```

4. **Verificar que el servidor está corriendo**:

Deberías ver el mensaje: `Servidor corriendo en http://localhost:3000`

---

## 🔐 Sistema de Autenticación

La API implementa un sistema de autenticación basado en **JWT (JSON Web Token)** que permite mantener las sesiones de usuario de forma stateless. Cada usuario debe autenticarse para poder realizar operaciones con las tareas.

### Flujo de Autenticación

1. El usuario se registra mediante el endpoint `/register`
2. El usuario inicia sesión mediante el endpoint `/login`
3. La API devuelve un token JWT que debe incluirse en las cabeceras de las solicitudes subsecuentes
4. El middleware `authMiddleware` verifica la validez del token en cada solicitud protegida

### Formato del Token

Los tokens JWT generados tienen la siguiente estructura:
- **Payload**: Contiene el nombre de usuario
- **Expiración**: 1 hora (3600 segundos)
- **Firma**: Utiliza la clave secreta `clave_secreta_api_tareas`

---

## 📡 Endpoints de la API

### Endpoints Públicos (Sin Autenticación)

#### 1. Verificar Estado del Servidor

**Endpoint**: `GET /`

**Descripción**: Endpoint de salud que confirma que la API está funcionando correctamente.

**Respuesta Exitosa**:
```json
{
  "mensaje": "API de tareas funcionando correctamente"
}
```

---

#### 2. Registro de Usuario

**Endpoint**: `POST /register`

**Descripción**: Registra un nuevo usuario en el sistema. Las contraseñas se almacenan de forma segura utilizando hash bcrypt.

**Cabeceras**: No requiere autenticación

**Cuerpo de la Solicitud**:
```json
{
  "usuario": "nombre_de_usuario",
  "password": "contraseña_segura"
}
```

**Validaciones**:
- El campo `usuario` es obligatorio
- El campo `password` es obligatorio
- El nombre de usuario debe ser único (no puede existir previamente)

**Respuestas**:

✅ **Usuario registrado exitosamente (201)**:
```json
{
  "mensaje": "Usuario registrado correctamente"
}
```

❌ **Error - Datos incompletos (400)**:
```json
{
  "error": "Datos incompletos"
}
```

❌ **Error - Usuario ya existe (400)**:
```json
{
  "error": "El usuario ya existe"
}
```

---

#### 3. Inicio de Sesión

**Endpoint**: `POST /login`

**Descripción**: Autentica a un usuario y devuelve un token JWT para acceder a las funcionalidades protegidas.

**Cuerpo de la Solicitud**:
```json
{
  "usuario": "nombre_de_usuario",
  "password": "contraseña"
}
```

**Respuestas**:

✅ **Login exitoso (200)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

❌ **Error - Credenciales inválidas (401)**:
```json
{
  "error": "Credenciales inválidas"
}
```

---

### Endpoints Protegidos (Requieren Autenticación)

Todos los siguientes endpoints requieren que incluyas el token JWT en la cabecera de la solicitud con el formato:

```
Authorization: Bearer <token_jwt>
```

---

#### 4. Obtener Todas las Tareas

**Endpoint**: `GET /tareas`

**Descripción**: Recupera el listado completo de tareas almacenadas en el sistema.

**Cabeceras Requeridas**:
```
Authorization: Bearer <tu_token_jwt>
```

**Respuesta Exitosa (200)**:
```json
[
  {
    "id": 1701234567890,
    "titulo": "Completar proyecto",
    "descripcion": "Finalizar la documentación del proyecto API"
  },
  {
    "id": 1701234567891,
    "titulo": "Estudiar Node.js",
    "descripcion": "Revisar conceptos de Express y middlewares"
  }
]
```

❌ **Error - Token requerido (403)**:
```json
{
  "error": "Token requerido"
}
```

❌ **Error - Token inválido (401)**:
```json
{
  "error": "Token inválido"
}
```

---

#### 5. Crear Nueva Tarea

**Endpoint**: `POST /tareas`

**Descripción**: Crea una nueva tarea en el sistema.

**Cabeceras Requeridas**:
```
Authorization: Bearer <tu_token_jwt>
```

**Cuerpo de la Solicitud**:
```json
{
  "titulo": "Título de la tarea",
  "descripcion": "Descripción detallada de la tarea"
}
```

**Validaciones**:
- El campo `titulo` es obligatorio
- El campo `descripcion` es obligatorio

**Respuesta Exitosa (201)**:
```json
{
  "id": 1701234567892,
  "titulo": "Nueva tarea",
  "descripcion": "Descripción de la nueva tarea"
}
```

❌ **Error - Datos incompletos (400)**:
```json
{
  "error": "Título y descripción requeridos"
}
```

---

#### 6. Actualizar Tarea Existente

**Endpoint**: `PUT /tareas/:id`

**Descripción**: Actualiza los datos de una tarea existente identificada por su ID.

**Cabeceras Requeridas**:
```
Authorization: Bearer <tu_token_jwt>
```

**Parámetros de Ruta**:
- `id`: Identificador único de la tarea (número)

**Cuerpo de la Solicitud**:
```json
{
  "titulo": "Título actualizado",
  "descripcion": "Descripción actualizada"
}
```

Los campos `titulo` y `descripcion` son opcionales. Si no se proporciona un campo, conservará su valor anterior.

**Respuesta Exitosa (200)**:
```json
{
  "id": 1701234567892,
  "titulo": "Título actualizado",
  "descripcion": "Descripción actualizada"
}
```

❌ **Error - Tarea no encontrada (404)**:
```json
{
  "error": "Tarea no encontrada"
}
```

---

#### 7. Eliminar Tarea

**Endpoint**: `DELETE /tareas/:id`

**Description**: Elimina una tarea del sistema identificada por su ID.

**Cabeceras Requeridas**:
```
Authorization: Bearer <tu_token_jwt>
```

**Parámetros de Ruta**:
- `id`: Identificador único de la tarea (número)

**Respuesta Exitosa (200)**:
```json
{
  "mensaje": "Tarea eliminada correctamente"
}
```

❌ **Error - Tarea no encontrada (404)**:
```json
{
  "error": "Tarea no encontrada"
}
```

---

## 🔧 Detalles Técnicos del Código

### Imports y Configuración Inicial

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
```

**Explicación**:
- **express**: Framework principal para crear la API
- **body-parser**: Middleware para parsear cuerpos JSON en las solicitudes
- **fs.promises**: Módulo del sistema de archivos con soporte para Promesas (lectura/escritura de archivos)
- **path**: Utilidades para manejo de rutas de archivos
- **bcryptjs**: Biblioteca para hashear contraseñas de forma segura
- **jsonwebtoken**: Generación y verificación de tokens JWT

### Configuración del Servidor

```javascript
const app = express();
const PORT = 3000;
const SECRET_KEY = 'clave_secreta_api_tareas';
```

**Parámetros**:
- `PORT`: Puerto donde escucha el servidor (3000)
- `SECRET_KEY`: Clave secreta utilizada para firmar los tokens JWT

### Rutas de Archivos de Datos

```javascript
const tareasFile = path.join(__dirname, 'tareas.json');
const usuariosFile = path.join(__dirname, 'usuarios.json');
```

`__dirname` proporciona la ruta absoluta del directorio donde se encuentra el archivo `server.js`. Esto asegura que los archivos de datos se encuentren correctamente independientemente de dónde se ejecute el script.

### Funciones Auxiliares

#### `leerArchivo(ruta)`

```javascript
async function leerArchivo(ruta) {
  try {
    const data = await fs.readFile(ruta, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}
```

**Función**: Lee un archivo JSON y lo convierte a un objeto JavaScript. Si el archivo no existe o está vacío, devuelve un array vacío.

**Uso**: Se utiliza para leer los archivos `tareas.json` y `usuarios.json`.

#### `escribirArchivo(ruta, data)`

```javascript
async function escribirArchivo(ruta, data) {
  await fs.writeFile(ruta, JSON.stringify(data, null, 2));
}
```

**Función**: Convierte un objeto JavaScript a formato JSON y lo escribe en un archivo. `JSON.stringify(data, null, 2)` formatea el JSON con indentación de 2 espacios para mejor legibilidad.

### Middleware de Autenticación

```javascript
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ error: 'Token requerido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
}
```

**Flujo de Trabajo**:
1. Extrae la cabecera `Authorization` de la solicitud
2. Verifica que exista el formato `Bearer <token>`
3. Verifica la validez del token usando la clave secreta
4. Si es válido, agrega la información decodificada a `req.user` y continua al siguiente middleware
5. Si no es válido, devuelve un error 401

### Manejo de Errores Global

```javascript
app.use((err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});
```

Este middleware captura cualquier error que ocurra en las rutas y devuelve una respuesta de error genérica al cliente, mientras registra el error detallado en la consola del servidor.

---

## 📊 Estructura de Datos

### Usuario

```json
{
  "usuario": "nombre_usuario",
  "password": "$2b$10$hash bcrypt..."
}
```

**Campos**:
- `usuario`: Nombre de usuario único (string)
- `password`: Contraseña hasheada con bcrypt (string)

### Tarea

```json
{
  "id": 1701234567890,
  "titulo": "Título de la tarea",
  "descripcion": "Descripción de la tarea"
}
```

**Campos**:
- `id`: Identificador único generado con `Date.now()` (número)
- `titulo`: Título o nombre de la tarea (string)
- `descripcion`: Descripción detallada de la tarea (string)

---

## 🚀 Ejemplo de Uso Completo

### 1. Registrar un Usuario

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"usuario": "admin", "password": "admin123"}'
```

### 2. Iniciar Sesión

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"usuario": "admin", "password": "admin123"}'
```

**Respuesta** (guardar el token):
```json
{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
```

### 3. Crear una Tarea (con token)

```bash
curl -X POST http://localhost:3000/tareas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_token>" \
  -d '{"titulo": "Mi primera tarea", "descripcion": "Esta es mi primera tarea"}'
```

### 4. Listar Tareas

```bash
curl -X GET http://localhost:3000/tareas \
  -H "Authorization: Bearer <tu_token>"
```

### 5. Actualizar una Tarea

```bash
curl -X PUT http://localhost:3000/tareas/1701234567890 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu_token>" \
  -d '{"titulo": "Tarea actualizada", "descripcion": "Nueva descripción"}'
```

### 6. Eliminar una Tarea

```bash
curl -X DELETE http://localhost:3000/tareas/1701234567890 \
  -H "Authorization: Bearer <tu_token>"
```

---

## ⚠️ Consideraciones de Seguridad

### Contraseñas

Las contraseñas se almacenan utilizando el algoritmo **bcrypt** con un costo de hash de 10. Esto proporciona:

- Protección contra ataques de fuerza bruta
- Hash unidireccional (no reversible)
- Protección contra tablas rainbow

### Tokens JWT

- Los tokens tienen una expiración de 1 hora por seguridad
- La clave secreta debe mantenerse segura y no compartirse
- En producción, se recomienda utilizar variables de entorno para la clave secreta

### Mejoras Recomendadas para Producción

1. **Validación de Entrada**: Implementar validación más robusta de datos de entrada usando bibliotecas como `joi` o `express-validator`

2. **Límites de Rate**: Implementar rate limiting para prevenir ataques de fuerza bruta

3. **HTTPS**: Forzar el uso de HTTPS en producción

4. **Variables de Entorno**: Usar `dotenv` para gestionar configuraciones sensibles

5. **Logs**: Implementar un sistema de logging más robusto

6. **Base de Datos**: Considerar el uso de una base de datos real como MongoDB o PostgreSQL para producción

---

## 📝 Códigos de Estado HTTP

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Solicitud exitosa |
| 201 | Created | Recurso creado exitosamente |
| 400 | Bad Request | Error en los datos enviados |
| 401 | Unauthorized | Token inválido o expirado |
| 403 | Forbidden | Token no proporcionado |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error en el servidor |

---

## 📚 Recursos Adicionales

- [Documentación oficial de Express.js](https://expressjs.com/)
- [Documentación de JSON Web Tokens](https://jwt.io/)
- [Documentación de bcrypt](https://github.com/dcodeIO/bcrypt.js)
- [Node.js Documentation](https://nodejs.org/docs/)

---

## 👤 Autor

Proyecto desarrollado como parte de la actividad de aprendizaje de desarrollo de APIs con Node.js y Express.

---

## 📄 Licencia

Este proyecto está disponible para uso educativo y de aprendizaje.

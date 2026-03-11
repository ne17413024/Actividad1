# Avance de Proyecto: Aplicación de Guías de Estudio

## 📋 Descripción del Proyecto

Esta aplicación full-stack permite a los usuarios crear, gestionar y estudiar guías de estudio personalizadas. Consiste en una API REST desarrollada con FastAPI y una aplicación móvil construida con React Native y Expo.

## 👥 Integrantes

- Natanael Jaime Janacua Elias
- Narciso Guadalupe Valadez Quintero
- Rodrigo Hernandez Luna
- Caleb de Leon

## 🛠️ Tecnologías Utilizadas

### Backend (API)
- **FastAPI**: Framework web moderno y rápido para construir APIs con Python
- **Firebase Admin SDK**: Para la integración con Firebase Realtime Database
- **Pydantic**: Para validación de datos y modelos
- **Uvicorn**: Servidor ASGI para FastAPI

### Frontend (Aplicación Móvil)
- **React Native**: Framework para desarrollo de aplicaciones móviles nativas
- **Expo**: Plataforma para desarrollo, construcción y despliegue de aplicaciones React Native
- **React Navigation**: Para navegación entre pantallas
- **Firebase SDK**: Para autenticación y base de datos en tiempo real
- **React Native Reanimated**: Para animaciones fluidas

### Base de Datos
- **Firebase Realtime Database**: Base de datos NoSQL en tiempo real de Google

### Despliegue
- **Docker Web**: Contenedorización de la aplicación
- **Debian 13**: Sistema operativo del servidor
- **PM2**: Gestor de procesos para Node.js/Express (usado para el despliegue)

## 🔧 Detalles del Backend

### Arquitectura del Backend
El backend de esta aplicación está construido utilizando **FastAPI**, un framework web moderno y de alto rendimiento para Python. FastAPI se basa en estándares como OpenAPI y JSON Schema, lo que permite una documentación automática de la API y una validación robusta de datos entrantes y salientes. Utiliza Pydantic para la definición de modelos de datos, asegurando que todas las entradas y salidas cumplan con esquemas estrictos, lo que mejora la fiabilidad y reduce errores en tiempo de ejecución.

#### Tecnologías Clave en el Backend
- **FastAPI**: Proporciona una API RESTful rápida y eficiente. Soporta operaciones asíncronas, lo que permite manejar múltiples solicitudes concurrentemente sin bloquear el servidor. Incluye características como inyección de dependencias, middleware y soporte nativo para WebSockets si se requiere en futuras expansiones.
- **Firebase Admin SDK**: Utilizado para la integración con Firebase Authentication y Realtime Database. Permite verificar tokens de autenticación de usuarios, gestionar sesiones y acceder a la base de datos de manera segura desde el servidor.
- **Pydantic**: Biblioteca para validación de datos y serialización. Define modelos de datos con tipos estrictos, facilitando la validación automática de payloads JSON en las rutas de la API.
- **Uvicorn**: Servidor ASGI que ejecuta la aplicación FastAPI. Es altamente eficiente y soporta conexiones asíncronas, ideal para aplicaciones que requieren baja latencia.
- **CORS (Cross-Origin Resource Sharing)**: Implementado mediante el middleware CORSMiddleware de FastAPI. Permite que el frontend, alojado en un dominio diferente (como Netlify), realice solicitudes al backend sin problemas de seguridad del navegador. En la configuración actual, se permiten orígenes específicos como `https://avance-proyecto-dfs.netlify.app` para el frontend desplegado, y `http://localhost:19006` para desarrollo local. Esto incluye permisos para todos los métodos HTTP (GET, POST, PUT, DELETE) y headers, asegurando una comunicación fluida entre frontend y backend.

### Despliegue del Backend
El backend se despliega en un **VPS (Virtual Private Server)** con las siguientes especificaciones:
- **Sistema Operativo**: Debian 13 (la versión más reciente de Debian, que ofrece estabilidad, seguridad y actualizaciones regulares).
- **Recursos**: 1 vCPU y 1 GB de RAM, suficiente para una aplicación de este tamaño que maneja operaciones CRUD básicas y autenticación. Esta configuración es cost-effective para proyectos en desarrollo o de pequeña escala.
- **Gestor de Procesos**: **PM2**, una herramienta avanzada para la gestión de procesos en entornos de producción. PM2 permite ejecutar aplicaciones Node.js (y en este caso, Python con Uvicorn) de manera persistente, reiniciándolas automáticamente en caso de fallos, balanceando la carga si es necesario, y proporcionando logs detallados. Aunque PM2 es comúnmente asociado con Node.js, se puede usar para cualquier aplicación que se ejecute como un proceso, facilitando el monitoreo y el despliegue continuo.
- **Contenedorización**: Utiliza Docker para empaquetar la aplicación y sus dependencias, asegurando consistencia entre entornos de desarrollo y producción. El contenedor expone el puerto 8000, donde corre la API.

El enlace del frontend desplegado es `https://avance-proyecto-dfs.netlify.app/`, alojado en Netlify, una plataforma de despliegue continuo para aplicaciones web estáticas y JAMstack. El backend, sin embargo, reside en el VPS mencionado, permitiendo una separación clara entre la lógica del servidor y la interfaz de usuario.

#### Beneficios del Despliegue Actual
- **Escalabilidad**: Con PM2 y Docker, es fácil escalar la aplicación horizontalmente si aumenta la demanda.
- **Seguridad**: Debian 13 incluye parches de seguridad actualizados, y el uso de CORS restringe el acceso solo a orígenes confiables.
- **Mantenimiento**: PM2 facilita el reinicio automático y el monitoreo, reduciendo el tiempo de inactividad.
- **Integración**: La combinación de FastAPI con Firebase permite una autenticación segura y un almacenamiento de datos en tiempo real, ideal para aplicaciones móviles.

## 📁 Estructura del Proyecto

```
Avance-Proyecto/
├── api/                          # API Backend
│   ├── main.py                   # Archivo principal de FastAPI
│   ├── firebase-key.json         # Credenciales de Firebase
│   ├── README.md                 # Documentación de la API
│   └── .venv/                    # Entorno virtual de Python
├── App/                          # Aplicación Móvil React Native
│   ├── App.js                    # Punto de entrada de la app
│   ├── package.json              # Dependencias de Node.js
│   ├── app.json                  # Configuración de Expo
│   ├── index.js                  # Archivo de entrada
│   ├── navigation/               # Configuración de navegación
│   │   ├── RootNavigation.js     # Navegación raíz (Stack)
│   │   ├── DrawerNavigation.js   # Navegación con drawer
│   │   ├── TabNavigation.js      # Navegación con pestañas
│   │   ├── homeStack.js          # Stack para home
│   │   └── settingStack.js       # Stack para configuraciones
│   ├── screens/                  # Pantallas de la aplicación
│   │   ├── login.js              # Pantalla de inicio de sesión
│   │   ├── Register.js           # Pantalla de registro
│   │   ├── home.js               # Pantalla principal (lista de guías)
│   │   ├── agregar.js            # Pantalla para crear guías
│   │   ├── study.js              # Pantalla de estudio de guías
│   │   ├── profile.js            # Perfil de usuario
│   │   ├── settings.js           # Configuraciones
│   │   ├── ajustes.js            # Ajustes adicionales
│   │   └── settingsDetail.js     # Detalles de configuración
│   ├── utils/                    # Utilidades
│   │   └── firebaseConfig.js     # Configuración de Firebase
│   └── assets/                   # Recursos estáticos
│       ├── adaptive-icon.png
│       ├── favicon.png
│       ├── icon.png
│       ├── splash-icon.png
│       └── wasd.png
└── README.md                     # Este archivo
```

## 🚀 Funcionalidades

### API Backend
La API proporciona endpoints RESTful para gestionar guías de estudio:

- **GET /**: Mensaje de bienvenida
- **GET /guias**: Obtener todas las guías
- **GET /guias/{user_id}**: Obtener guías de un usuario específico
- **POST /guias**: Crear una nueva guía
- **PUT /guias/{guia_id}**: Actualizar una guía existente
- **DELETE /guias/{guia_id}**: Eliminar una guía

### Aplicación Móvil
La app móvil ofrece una experiencia completa para el estudio:

#### Autenticación
- Inicio de sesión con email y contraseña
- Registro de nuevos usuarios
- Integración con Firebase Authentication

#### Gestión de Guías
- Crear guías de estudio personalizadas
- Agregar preguntas y respuestas a las guías
- Ver lista de guías creadas
- Editar y eliminar guías

#### Modo de Estudio
- Navegar por preguntas de una guía
- Mostrar/ocultar respuestas
- Marcar preguntas como completadas
- Seguimiento del progreso de estudio

#### Navegación
- Navegación por pestañas (Home, Agregar, Study)
- Drawer navigation para acceder a perfil y configuraciones
- Stack navigation para flujos específicos

## 📱 Cómo Usar la Aplicación

### 1. Instalación y Configuración

#### API Backend
```bash
cd api
python -m venv .venv
source .venv/bin/activate  # En Windows: .venv\Scripts\activate
pip install fastapi uvicorn firebase-admin pydantic
uvicorn main:app --reload
```

#### Aplicación Móvil
```bash
cd App
npm install
npm start
# O usar Expo CLI: expo start
```

### 2. Flujo de Uso

1. **Registro/Inicio de Sesión**: El usuario debe crear una cuenta o iniciar sesión
2. **Crear Guía**: En la pestaña "Agregar", crear una nueva guía con nombre y preguntas/respuestas
3. **Ver Guías**: En la pestaña "Home", ver todas las guías creadas
4. **Estudiar**: Tocar una guía para entrar en modo estudio
5. **Progreso**: Marcar preguntas como completadas y navegar entre ellas

### 3. Endpoints de la API

#### Crear una Guía
```bash
POST /guias
Content-Type: application/json

{
  "nombre": "Matemáticas Básicas",
  "preguntas": [
    {"pregunta": "¿Qué es 2+2?", "respuesta": "4"},
    {"pregunta": "¿Qué es 3x3?", "respuesta": "9"}
  ],
  "user": "user_id"
}
```

#### Obtener Guías de un Usuario
```bash
GET /guias/{user_id}
```

## 🔧 Despliegue

### Configuración del Servidor
- **Sistema Operativo**: Debian 13
- **Contenedorización**: Docker Web
- **Gestión de Procesos**: PM2

### Pasos de Despliegue

1. **Preparar el servidor Debian 13**
2. **Instalar Docker y PM2**
3. **Configurar el contenedor Docker Web**
4. **Desplegar la API con PM2**
5. **Configurar variables de entorno**
6. **Configurar firewall y seguridad**

### Comandos de Despliegue
```bash
# Instalar dependencias
sudo apt update
sudo apt install docker.io pm2

# Construir y ejecutar contenedor
docker build -t guia-estudio-api .
docker run -d -p 8000:8000 guia-estudio-api

# Gestionar con PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 🎨 Diseño y UX

### Tema Visual
- **Colores**: Tema oscuro con blanco y gris claro
- **Estilo**: Minimalista y moderno
- **Tipografía**: Sans-serif con pesos variables

### Componentes Principales
- **Cards**: Para mostrar guías y preguntas
- **Botones**: Estilo outlined con bordes blancos
- **Inputs**: Campos transparentes con bordes
- **Navegación**: Headers negros con texto blanco

## 🔐 Seguridad

### Autenticación
- Firebase Authentication para manejo seguro de usuarios
- Validación de tokens en cada request
- Protección de rutas sensibles

### Base de Datos
- Reglas de seguridad de Firebase Realtime Database
- Validación de datos en el backend
- Filtrado de datos por usuario

## 📈 Estado del Proyecto

Este es un **avance de proyecto** que incluye:

✅ **Completado**:
- API REST completa con FastAPI
- Aplicación móvil funcional con React Native
- Autenticación con Firebase
- Base de datos en tiempo real
- Navegación completa
- Interfaz de usuario moderna
- Despliegue configurado

🔄 **En Desarrollo**:
- Funcionalidades avanzadas de estudio
- Sincronización offline
- Notificaciones push
- Análisis de progreso

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request


## 👥 Autor

Proyecto desarrollado como parte de la materia de Desarrollo Full Stack.

---

*Documentación creada para el avance de proyecto - Universidad Tecmilenio*

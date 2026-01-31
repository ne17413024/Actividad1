# API de Avance-Proyecto

Esta es la componente API del Avance-Proyecto, construida con Python.

## Estructura del Proyecto

### Archivos

- **.gitignore**: Este archivo especifica archivos y directorios que deben ser ignorados por el control de versiones de Git. Actualmente ignora el archivo de clave de Firebase (`Avance-Proyecto/api/firebase-key.json`) para evitar que credenciales sensibles sean confirmadas en el repositorio.

- **main.py**: Este es el punto de entrada principal para la aplicación API en Python. Contiene la configuración de la aplicación FastAPI, incluyendo la inicialización de Firebase para autenticación, configuración de CORS para permitir solicitudes desde el frontend, definición de modelos de datos con Pydantic, y endpoints para el registro de usuarios.

- **.venv/**: Este directorio contiene el entorno virtual de Python para el proyecto, aislando dependencias y asegurando versiones consistentes de paquetes en diferentes entornos.

## Tecnologías Utilizadas en la API

Esta API utiliza varias tecnologías modernas para proporcionar un servicio robusto, seguro y escalable. A continuación, se detallan las principales tecnologías empleadas, incluyendo su propósito y beneficios:

### FastAPI
- **Descripción**: FastAPI es un framework web moderno y de alto rendimiento para construir APIs con Python 3.7+. Está basado en estándares abiertos como OpenAPI (anteriormente conocido como Swagger) y JSON Schema.
- **Uso en el proyecto**: Se utiliza como el framework principal para definir rutas, manejar solicitudes HTTP y proporcionar documentación automática de la API. FastAPI permite crear endpoints de manera rápida y eficiente, con validación automática de datos y soporte para operaciones asíncronas.
- **Beneficios**: Ofrece un rendimiento comparable a Node.js y Go, genera documentación interactiva automáticamente (accesible en `/docs`), y facilita el desarrollo con tipado fuerte y validación integrada.

### Firebase Admin SDK
- **Descripción**: El SDK de Firebase Admin es una biblioteca oficial de Google que permite interactuar con los servicios de Firebase desde un servidor backend.
- **Uso en el proyecto**: Se emplea para la autenticación de usuarios. Específicamente, se utiliza para crear cuentas de usuario en Firebase Authentication, permitiendo el registro seguro de nuevos usuarios con email y contraseña.
- **Beneficios**: Proporciona una integración directa con Firebase, asegurando que la autenticación sea manejada por un servicio confiable y escalable. Incluye manejo de errores específicos, como correos electrónicos ya existentes, y soporta características avanzadas como verificación de email y restablecimiento de contraseñas.

### Pydantic
- **Descripción**: Pydantic es una biblioteca de Python para validación de datos y configuración, basada en anotaciones de tipo de Python.
- **Uso en el proyecto**: Se utiliza para definir modelos de datos, como el modelo `RegisterUser`, que valida automáticamente los datos de entrada (email y contraseña) antes de procesarlos en los endpoints.
- **Beneficios**: Garantiza que los datos entrantes cumplan con los tipos y formatos esperados, reduciendo errores y mejorando la robustez de la API. También genera esquemas JSON automáticamente para la documentación de FastAPI.

### CORS (Cross-Origin Resource Sharing)
- **Descripción**: CORS es un mecanismo de seguridad implementado en navegadores web que permite o restringe solicitudes de recursos desde un dominio diferente al del servidor.
- **Uso en el proyecto**: Se configura mediante el middleware `CORSMiddleware` de FastAPI para permitir que el frontend (desplegado en Netlify) realice solicitudes a esta API. Específicamente, se permiten orígenes como `https://avance-proyecto-dfs.netlify.app` y `http://localhost:19006` para desarrollo local.
- **Beneficios**: Habilita la comunicación segura entre el frontend y el backend cuando están en dominios diferentes, previniendo ataques de cross-site scripting (XSS) y cross-site request forgery (CSRF). La configuración incluye permitir credenciales, todos los métodos HTTP (GET, POST, etc.) y todos los headers, lo que facilita el desarrollo pero debe ajustarse en producción para mayor seguridad.

### Python
- **Descripción**: Python es un lenguaje de programación de alto nivel, interpretado y de propósito general.
- **Uso en el proyecto**: Es el lenguaje base para toda la implementación de la API, aprovechando su simplicidad y extenso ecosistema de bibliotecas.
- **Beneficios**: Facilita el desarrollo rápido, tiene una sintaxis clara y legible, y cuenta con una comunidad activa que proporciona soporte y actualizaciones continuas.

## Endpoints

Actualmente, la API cuenta con el siguiente endpoint implementado:

- **POST /register**: Permite registrar un nuevo usuario en Firebase Authentication. Recibe un objeto JSON con `email` y `password`, valida los datos con Pydantic, y crea el usuario en Firebase. Retorna un mensaje de éxito y el UID del usuario creado. Maneja errores como correos electrónicos ya existentes.

## Despliegue

El despliegue de esta API fue realizado con Downweb, una plataforma de alojamiento web que ofrece servidores virtuales basados en Debian. Específicamente, la instancia utilizada cuenta con las siguientes especificaciones:

- **Sistema Operativo**: Debian 13 (la versión más reciente de Debian, que proporciona estabilidad, seguridad y un amplio repositorio de paquetes).
- **Recursos**: 1 vCPU (un núcleo virtual de procesador) y 1 GB de RAM, lo cual es suficiente para aplicaciones ligeras como esta API, permitiendo un rendimiento eficiente sin sobrecargar el servidor.

### Tecnologías Utilizadas en el Despliegue

- **Framework de la API**: FastAPI, un framework moderno y rápido para construir APIs con Python. FastAPI se basa en estándares como OpenAPI y JSON Schema, lo que facilita la documentación automática de endpoints, validación de datos y generación de interfaces interactivas. Es ideal para aplicaciones asíncronas y de alto rendimiento, aprovechando las capacidades de Python para manejar solicitudes concurrentes de manera eficiente.

- **Gestión de Procesos**: PM2 (Process Manager 2), una herramienta de gestión de procesos para aplicaciones Node.js, pero que también puede manejar procesos de Python y otros lenguajes. En este despliegue, PM2 se utiliza para:
  - Ejecutar la aplicación FastAPI en segundo plano.
  - Monitorear el estado del proceso, reiniciándolo automáticamente en caso de fallos.
  - Gestionar logs y escalar la aplicación si es necesario.
  - Proporcionar comandos simples para iniciar, detener y recargar la aplicación, mejorando la fiabilidad y facilidad de mantenimiento.

- **Conexión HTTPS**: Ngrok, una herramienta que crea túneles seguros desde localhost a internet, permitiendo exponer la API localmente alojada a través de una URL HTTPS pública. Esto es crucial para:
  - Probar la API en entornos de desarrollo o staging sin necesidad de un dominio propio.
  - Proporcionar una conexión segura (HTTPS) para acceder a la API desde cualquier lugar, evitando problemas de seguridad asociados con HTTP plano.
  - Facilitar la integración con servicios externos que requieren URLs públicas, como webhooks o APIs de terceros.

### Proceso de Despliegue

1. **Configuración del Servidor**: Se provisionó una instancia en Downweb con Debian 13, asegurando que el sistema esté actualizado y configurado con las dependencias necesarias (como Python, pip y las bibliotecas requeridas por FastAPI).

2. **Instalación de Dependencias**: Se instalaron FastAPI, Uvicorn (el servidor ASGI recomendado para FastAPI), PM2 y Ngrok en el servidor.

3. **Configuración de la Aplicación**: La aplicación FastAPI se configuró para ejecutarse en un puerto específico (por ejemplo, 8000), y se utilizó PM2 para gestionarla como un proceso daemon.

4. **Exposición Pública**: Ngrok se configuró para crear un túnel HTTPS que redirige el tráfico desde una URL pública (como `https://random-subdomain.ngrok.io`) al puerto local de la API, permitiendo acceso remoto seguro.

Este enfoque de despliegue asegura que la API sea accesible, segura y manejable, con herramientas que facilitan el monitoreo y la escalabilidad futura.
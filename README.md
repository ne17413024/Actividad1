# Tareas Desarrollo Full Stack

Este repositorio contiene las tareas y actividades prácticas del curso de Desarrollo Full Stack del cuarto semestre en la Universidad Tecmilenio, así como el avance de proyecto final del curso.

---

## Objetivo

Almacenar y organizar las actividades realizadas durante el curso, demostrando el aprendizaje progresivo en el desarrollo de aplicaciones web full stack, además de documentar el avance de un proyecto personal de aplicación de guías de estudio.

---

## Resumen de Actividades

### Actividad 1: TechNova Solutions

Página web simple para TechNova Solutions, una empresa de soluciones tecnológicas innovadoras. Incluye encabezado con misión y visión, y sección de proyectos destacados.

Archivos principales:
- `index.html`: Estructura HTML básica.
- `style.css`: Estilos CSS para el diseño.

---

### Actividad 2: Gestión de Tareas y Ejercicios de Desarrollo Web

Aplicación web de gestión de tareas (To-Do List) que permite agregar, editar, eliminar y marcar tareas como completadas. Utiliza JavaScript ES6, manipulación del DOM y `localStorage` para persistencia de datos.

Archivos principales:
- `index.html`
- `style.css`
- `script.js`

#### Subcarpeta: ejerciciosCastigo

Contiene 10 ejercicios individuales de desarrollo web frontend (ejercicio1 a ejercicio10), cada uno en su propia subcarpeta, con HTML, CSS, JS y README explicativo.

- **Ejercicio 1**: Contador simple
- **Ejercicio 2**: Generador de colores aleatorios
- **Ejercicio 3**: Contador de caracteres
- **Ejercicio 4**: Filtro de lista en tiempo real
- **Ejercicio 5**: Formateador de nombres completos
- **Ejercicio 6**: Conversor de minutos a horas y minutos
- **Ejercicio 7**: Validador de emails
- **Ejercicio 8**: Calculadora de promedio de calificaciones
- **Ejercicio 9**: Convertidor de texto
- **Ejercicio 10**: Calculadora de descuentos

---

## Tecnologías Utilizadas en las Actividades

- HTML5
- CSS3
- JavaScript ES6

---

## Cómo Ejecutar las Actividades

Abrir el archivo `index.html` correspondiente en un navegador moderno.

---

# Avance de Proyecto: Aplicación de Guías de Estudio

## 📋 Descripción del Proyecto

Aplicación full-stack que permite crear, gestionar y estudiar guías de estudio personalizadas. Consta de una API REST en FastAPI y una app móvil en React Native y Expo.

---

## Link: https://avance-proyecto-dfs.netlify.app/

---

## 🛠️ Tecnologías Utilizadas

### Backend (API)
- **FastAPI**, **Firebase Admin SDK**, **Pydantic**, **Uvicorn**

### Frontend (App Móvil)
- **React Native**, **Expo**, **React Navigation**, **Firebase SDK**, **React Native Reanimated**

### Base de Datos
- **Firebase Realtime Database**

### Despliegue
- **Docker Web**
- **Debian 13**
- **PM2**

---

## 📁 Estructura del Proyecto

Avance-Proyecto/
├── api/
│ ├── main.py
│ ├── firebase-key.json
│ ├── README.md
│ └── .venv/
├── App/
│ ├── App.js
│ ├── package.json
│ ├── app.json
│ ├── index.js
│ ├── navigation/
│ ├── screens/
│ ├── utils/
│ └── assets/
└── README.md

---

## 🚀 Funcionalidades

### API Backend
- CRUD de guías de estudio
- Validación de datos
- Autenticación y autorización de usuarios

### Aplicación Móvil
- Registro e inicio de sesión con Firebase
- Crear, editar y eliminar guías
- Agregar preguntas y respuestas
- Modo de estudio con seguimiento de progreso
- Navegación con tabs, drawer y stack

---

## 📱 Cómo Usar la Aplicación

### 1. Instalación y Configuración

#### API Backend
```bash
cd api
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install fastapi uvicorn firebase-admin pydantic
uvicorn main:app --reload

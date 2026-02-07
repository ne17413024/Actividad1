const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const app = express();
const PORT = 3000;
const SECRET_KEY = 'clave_secreta_api_tareas';

const tareasFile = path.join(__dirname, 'tareas.json');
const usuariosFile = path.join(__dirname, 'usuarios.json');

app.use(bodyParser.json());

async function leerArchivo(ruta) {
  try {
    const data = await fs.readFile(ruta, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function escribirArchivo(ruta, data) {
  await fs.writeFile(ruta, JSON.stringify(data, null, 2));
}

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

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de tareas funcionando correctamente' });
});

app.post('/register', async (req, res, next) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    const usuarios = await leerArchivo(usuariosFile);

    const existe = usuarios.find(u => u.usuario === usuario);
    if (existe) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    usuarios.push({
      usuario,
      password: passwordHash
    });

    await escribirArchivo(usuariosFile, usuarios);

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    next(error);
  }
});

app.post('/login', async (req, res, next) => {
  try {
    const { usuario, password } = req.body;

    const usuarios = await leerArchivo(usuariosFile);
    const user = usuarios.find(u => u.usuario === usuario);

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const valido = await bcrypt.compare(password, user.password);
    if (!valido) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ usuario }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    next(error);
  }
});

app.get('/tareas', authMiddleware, async (req, res, next) => {
  try {
    const tareas = await leerArchivo(tareasFile);
    res.json(tareas);
  } catch (error) {
    next(error);
  }
});

app.post('/tareas', authMiddleware, async (req, res, next) => {
  try {
    const { titulo, descripcion } = req.body;

    if (!titulo || !descripcion) {
      return res.status(400).json({ error: 'Título y descripción requeridos' });
    }

    const tareas = await leerArchivo(tareasFile);

    const nuevaTarea = {
      id: Date.now(),
      titulo,
      descripcion
    };

    tareas.push(nuevaTarea);
    await escribirArchivo(tareasFile, tareas);

    res.status(201).json(nuevaTarea);
  } catch (error) {
    next(error);
  }
});

app.put('/tareas/:id', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;

    const tareas = await leerArchivo(tareasFile);
    const index = tareas.findIndex(t => t.id == id);

    if (index === -1) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    tareas[index] = {
      ...tareas[index],
      titulo: titulo || tareas[index].titulo,
      descripcion: descripcion || tareas[index].descripcion
    };

    await escribirArchivo(tareasFile, tareas);

    res.json(tareas[index]);
  } catch (error) {
    next(error);
  }
});

app.delete('/tareas/:id', authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;

    const tareas = await leerArchivo(tareasFile);
    const nuevasTareas = tareas.filter(t => t.id != id);

    if (tareas.length === nuevasTareas.length) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    await escribirArchivo(tareasFile, nuevasTareas);
    res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

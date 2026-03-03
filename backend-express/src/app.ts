import express from 'express';
import cors from 'cors';

import usersRouter from './routes/users.routes';
import tareasRouter from './routes/task.routes';
import tablerosRouter from './routes/tableros.routes';
import permissionsRouter from './routes/permissions.routes';
import configuracionesRouter from './routes/configurations.routes';

const app = express();
const port = process.env.PORT || 4321;

// Configuración CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de Gestión de Tareas corriendo perfectamente.');
});

// Rutas 
app.use('/api/users', usersRouter);
app.use('/api/tareas', tareasRouter);
app.use('/api/tableros', tablerosRouter);
app.use('/api/permisos', permissionsRouter);
app.use('/api/configuraciones', configuracionesRouter);


if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Servidor local corriendo en http://localhost:${port}`);
  });
}

export default app;
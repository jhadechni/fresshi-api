import express from 'express';
import cors from 'cors';
import dataRoutes from '../adapters/routes/dataRoutes';

const app = express();
const PORT = process.env.PORT || 4000;
// Configurar CORS para permitir cualquier origen
app.use(cors());

app.use(express.json());
app.use('/api/data', dataRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const dbConnectionString = process.env.DATABASE_URL;

const db = new pg.Pool({
  connectionString: dbConnectionString,
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>
  res.send(
    '<h1 style="color: red; text-align: center;">This is the root route</h1>'
  )
);

app.get('/tasks', async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT * FROM tasks`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server is down :(' });
  }
});

app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

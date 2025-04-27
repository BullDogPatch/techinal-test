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

app.post('/create-task', async (req, res) => {
  const { title, description, status, due_date } = req.body;
  try {
    const { rows } = await db.query(
      `INSERT INTO tasks (title, description, status, due_date) VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, description, status, due_date]
    );
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to post task' });
  }
});

app.delete('/delete-task/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(`DELETE FROM tasks WHERE id = $1`, [id]);
    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Task deleted' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
});

app.patch('/task/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await db.query(
      'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING status;',
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ status: result.rows[0].status });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Failed to update task status' });
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

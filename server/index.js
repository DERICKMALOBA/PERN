const express = require("express");
const cors = require("cors");//allow the front end to communicate with the back end
const app = express();
const { Pool } = require("pg");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());//parsing json data

app.use("/health", (req, res) => {
  res.send({ msg: "Health is okay!" });
});

// Create a todo
app.post("/todos", async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (title, description, due_date) VALUES($1, $2, $3) RETURNING *",
      [title, description, dueDate]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a specific todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;
    await pool.query(
      "UPDATE todo SET title = $1, description = $2, due_date = $3 WHERE todo_id = $4",
      [title, description, dueDate, id]
    );
    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

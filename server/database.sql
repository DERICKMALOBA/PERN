CREATE DATABASE perntodo;

CREATE TABLE todo (
  todo_id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  due_date DATE
);


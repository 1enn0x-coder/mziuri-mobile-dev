const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const todos = [
  { id: 1, title: "React Native-ის დავალება", completed: false },
  { id: 2, title: "ბექენდის შემოწმება", completed: true },
];

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.patch("/api/todos/:id", (req, res) => {
  const todo = todos.find((item) => item.id === Number(req.params.id));

  if (!todo) {
    return res.status(404).json({ error: "Todo ვერ მოიძებნა" });
  }

  const { title, completed } = req.body ?? {};

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({ error: "არასწორი მონაცემები" });
  }

  todo.title = title.trim();
  todo.completed = completed;
  res.json(todo);
});

app.listen(3001, "127.0.0.1", () => {
  console.log("Backend running at http://127.0.0.1:3001");
});

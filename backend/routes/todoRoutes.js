const express = require("express");
const router = express.Router();

const Todo = require("../models/Todo");

// Get All Todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create Todo
router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Todo
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(todo);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);

    res.json({
      message: "Todo Deleted"
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
const jsonServer = require('json-server');
const router = jsonServer.router('server/db/db.json');
const { v4: uuidv4 } = require('uuid');

function getTodosDB() {
  return router.db.get('todos');
}

class TodoController {
  getTodos(req, res) {
    const todos = getTodosDB().value();

    res.status(200).send(todos);
  }

  addTodo(req, res) {
    const todo = {
      id: uuidv4(),
      ...req.body,
      status: 'todo',
      tags: [],
      isPinned: false,
      createdAt: Date.now(),
      updatedAt: null,
    };

    getTodosDB().push(todo).write();

    res.status(200).send(todo);
  }

  editTodo(req, res) {
    const id = req.params.id;

    getTodosDB().find({ id })
      .assign({
        ...req.body,
        updatedAt: Date.now(),
      })
      .write();

    const todo = getTodosDB().find({ id }).value();

    res.status(200).send(todo);
  }

  addTag(req, res) {
    const id = req.params.id;

    const todo = getTodosDB().find({ id }).value();

    getTodosDB().find({ id })
      .assign({
        tags: [...todo.tags, req.body.tag],
        updatedAt: Date.now(),
      })
      .write();

    res.status(200).send();
  }

  deleteTag(req, res) {
    const id = req.params.id;

    const todo = getTodosDB().find({ id }).value();

    getTodosDB().find({ id })
      .assign({
        tags: todo.tags.filter((tag) => tag !== req.body.tag),
        updatedAt: Date.now(),
      })
      .write();

    res.status(200).send();
  }

  pinTodo(req, res) {
    const id = req.params.id;

    getTodosDB().find({ id }).assign({ isPinned: true }).write();

    res.status(200).send();
  }

  unpinTodo(req, res) {
    const id = req.params.id;

    getTodosDB().find({ id }).assign({ isPinned: false }).write();

    res.status(200).send();
  }

  deleteTodo(req, res) {
    const id = req.params.id;

    getTodosDB().remove({ id }).write();

    res.status(200).send();
  }
}

module.exports = new TodoController();

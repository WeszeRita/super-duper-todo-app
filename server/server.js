const { todoController, userController } = require('./controllers');
const { ROUTES } = require('./constants');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db/db.json');
const middlewares = jsonServer.defaults();

const PORT = 3000;
const HOSTNAME = 'localhost';

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get(ROUTES.todos, todoController.getTodos);
server.post(ROUTES.todos, todoController.addTodo);
server.patch(`${ ROUTES.todos }/:id`, todoController.editTodo);
server.delete(`${ ROUTES.todos }/:id`, todoController.deleteTodo);

server.patch(`${ ROUTES.todos }/:id/pin`, todoController.pinTodo);
server.patch(`${ ROUTES.todos }/:id/unpin`, todoController.unpinTodo);

server.patch(`${ ROUTES.todos }/:id/add-tag`, todoController.addTag);
server.patch(`${ ROUTES.todos }/:id/delete-tag`, todoController.deleteTag);

server.get(ROUTES.premium, userController.getPremium);
server.post(ROUTES.premium, userController.setPremium);

server.use(router);

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running at http://${ HOSTNAME }:${ PORT }/`);
});

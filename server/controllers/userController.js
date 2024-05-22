const jsonServer = require('json-server');
const router = jsonServer.router('server/db/db.json');

class UserController {
  getPremium(req, res) {
    const user = router.db.get('user').value();
    res.status(200).send(user?.premium || false);
  }

  setPremium(req, res) {
    router.db.set('user.premium', true).write();
    res.status(200).send();
  }
}

module.exports = new UserController();

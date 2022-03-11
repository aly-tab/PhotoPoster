const Users = require('../controllers/login.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
  app.post("/api/register", Users.register);
  app.post(process.env.REACT_URI + "/api/login", Users.login);
  app.get("/api/users/loggedIn", authenticate, Users.getLoggedInUser);
  app.get("/api/users/logout", Users.logout)
}
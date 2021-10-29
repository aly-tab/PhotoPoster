const UserController = require('../controllers/user.controller');
module.exports = function(app) {
    app.get('/api/user', UserController.list);
    app.get('/api/user/:username', UserController.findOneUser);
    app.get('/api/user/:id', UserController.findById);
    app.delete('/api/user/:id', UserController.delete);
    app.put('/api/user', UserController.update);
}
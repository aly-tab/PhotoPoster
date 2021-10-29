const { User } = require('../models/login.model');
module.exports.list = (request, response) => {
    User.find({})
        .then(users => response.json(users))
        .catch(err => response.json(err))
}

module.exports.delete = (request, response) => {
    User.deleteOne({_id: request.params.id})
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

module.exports.findOneUser = (request, response) => {
    User.findOne({username:request.params.username})
        .then(user => response.json(user))
        .catch(err => response.json(err))
}

module.exports.update = (request, response) => {
    User.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedUser => response.json(updatedUser))
        .catch(err => response.status(400).json(err))
}

module.exports.findById = (request, response) => {
    User.findOne({_id:request.params.id})
        .then(user => response.json(user))
        .catch(err => response.json(err))
}

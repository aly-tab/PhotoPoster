const { Photo } = require('../models/photo.model');
module.exports.list = (request, response) => {
    Photo.find({})
        .populate("user_id")
        .then(photos => response.json(photos))
        .catch(err => response.json(err))
}

module.exports.create = (request, response) => {
    console.log(request.file.filename);
    const photo = request.file.filename;
    const text = request.body.text;
    const user_id = request.body.user_id;
    const newPhotoData = {
        photo,
        text,
        user_id
    }
    const newPhoto = new Photo(newPhotoData);

    newPhoto.save()
           .then(() => response.json('Photo Added'))
           .catch(err => response.status(400).json(err));
}


module.exports.detail = (request, response) => {
    Photo.findOne({_id:request.params.id})
        .then(photo => response.json(photo))
        .catch(err => response.json(err))
}

module.exports.update = (request, response) => {
    Photo.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedPhoto => response.json(updatedPhoto))
        .catch(err => response.status(400).json(err))
}

module.exports.delete = (request, response) => {
    Photo.deleteOne({_id: request.params.id})
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}

module.exports.findAllPhotos = (request, response) => {
    Photo.find({user_id: request.params.userId})
        .populate("user_id")
        .then(photos => response.json(photos))
        .catch(err => response.json(err))
}

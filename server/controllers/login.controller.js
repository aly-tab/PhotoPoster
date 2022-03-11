const { User } = require('../models/login.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
    register(req, res){
        const user = new User(req.body);
        user.save()
            .then(()=>{
                res
                    .cookie("usertoken", jwt.sign({_id:user._id}, process.env.SECRET_KEY), {httpOnly: true})
                    .json({msg: "success", user: user})

            })
            .catch(err=> res.json(err))
    }

    login(req, res) {
        User.findOne({email: req.body.email})
            .then(user => {
                if(user === null) {
                    return res.json("Invalid login attempt");
                } else {
                    bcrypt.compare(req.body.password, user.password)
                        .then(passwordIsValid => {
                            if (passwordIsValid) {
                                res.cookie("usertoken", jwt.sign({_id: user._id}, process.env.SECRET_KEY) , {httpOnly:true})
                                .json({msg: "success!"});
                            } else {
                                res.json({msg: "Invalid login attempt"})
                            }
                        })
                        .catch(err => res.json({msg: "Invalid login attempt", err}))
                }
            })
            .catch(err => res.json(err))
    }
    
    logout (req, res) {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }

    getLoggedInUser(req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete:true});
        User.findById(decodedJWT.payload._id)
            .then(user => res.json(user))
            .catch(err => res.json(err))
    }
       
}

module.exports = new UserController();
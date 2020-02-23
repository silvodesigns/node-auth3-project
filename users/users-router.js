const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./users-model.js');

router.get('/', verify, (req, res) => {
    
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.send(err);
        })
});


function verify( req, res, next) {
    const { username, password } = req.headers;

    if (username && password){

    Users.findBy({username})
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                next()
            } else {
                res.status(401).json({message:"Invalid credentials"})
            }
        })
        .catch(error => {
            res.status(500).json({message: "ran into unexpected"})
        })
    } else {
        res.status(400).json({message: "No credential provided"})
    }

}


module.exports = router;
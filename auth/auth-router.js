const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model.js');


//api/auth/register
router.post('/register', (req, res) => {
    let user = req.body;

    console.log(user, 'from insdie register');
    
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => {
            res.status(500).json(error);
        });

});


router.post('/login',( req, res) => {
    let {username, password} = req.body;

  

    Users.findBy({username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){

            const token = generateToken(user);

            res.status(200).json({
                message: `Welcome ${user.username}!`,
                token,
            });
        } else {
            res.status(401).json({message: "Invalid Credentials"});
        }
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    };

    const secret = 'ksfjdsjdf';
    const options = {
        expiresIn: '8h'
    };

    return jwt.sign(payload, secret, options)
}



module.exports = router;
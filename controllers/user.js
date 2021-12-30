const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../object/User');


exports.signingUser = (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.status(403).json({message: 'Error input'})
    }
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(() => res.status(200).json({message : 'Sser created !'}))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).send({ error}))
};
exports.loginUser = (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({message: 'Error Input'})
    }
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                return res.status(401).json({error: 'User not found'})
            }
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid){
                    return res.status(401).json({error: 'PassWord incorrect'})
                }
                res.status(200).json({
                    userId : user._id,
                    token : jwt.sign(
                        { userId : user._id },
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}
                    )
                })
            })
            .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};
exports.getUsers = (req, res) => {
    User.find()
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error }));

};
exports.deleteUser = (req,res) => {
    User.find()
    .then(users => {
        for(let user of users){
            User.deleteOne({_id:user._id})
            .then(() => {

            })
            .catch(error => res.status(400).json({ error }));
        }
    })
    .catch(error => res.status(400).json({ error }));
    res.status(200).send({message:"success"});
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../object/User');


exports.signingUser = (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.status(404).json({message: 'Error input'})
    }
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(() => res.status(201).json({message : 'Utilisateur créer'}))
        .catch(error => res.status(418).json({ error }))
    })
    .catch(error => res.status(400).send({ error}))
};
exports.loginUser = (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.status(404).json({message: 'Error'})
    }
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                return res.status(400).json({error: 'Utilisateur introuvable'})
            }
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid){
                    return res.status(400).json({error: 'Mot de passe incorrecte'})
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
            .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))
};
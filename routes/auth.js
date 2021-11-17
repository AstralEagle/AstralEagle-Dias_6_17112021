const express = require('express');
const router = express.Router();


router.get('/', (req,res)=>{
    res.status(200).send({
        message: 'Succes'
    });
});
router.post('/signup',(req,res)=>{
    console.log("Inscription : ");
    console.log(req.body);
    if( !req.body.email||
        !req.body.password){
            return res.status(400).send(new Error('Bad request!'));
    }
    res.status(201).send({message: 'Enregister'})
});
router.post('/login', (req,res)=>{
    console.log("Connexion");
    res.status(201).send({
        userId: 'Enregister',
        token: "klevujhzsbfgobnqkehfgejrhgfierghzjker"
    })
});


module.exports = router;